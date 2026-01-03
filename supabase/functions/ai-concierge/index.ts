import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { messages } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');
    
    if (!LOVABLE_API_KEY) {
      console.error('LOVABLE_API_KEY is not configured');
      throw new Error('AI service not configured');
    }

    console.log('Processing chat request with', messages.length, 'messages');

    const systemPrompt = `Вы — AI-консьерж компании Magnum Estate, ведущего девелопера премиальной недвижимости на Бали.

Ваши задачи:
- Помогать клиентам с вопросами о недвижимости на Бали
- Предоставлять информацию об инвестиционных возможностях (ROI до 15% годовых)
- Рассказывать о доступных объектах: виллы от $250,000
- Объяснять преимущества инвестирования на Бали
- Помогать записаться на консультацию

Ключевые факты о Magnum Estate:
- 500+ реализованных объектов
- 7 лет на рынке
- Полное управление недвижимостью 360°
- Локации: Чангу, Семиньяк, Улувату, Убуд
- Рассрочка до 24 месяцев

Отвечайте кратко, профессионально и дружелюбно. Используйте русский язык.
Если клиент заинтересован — предложите оставить контакты для связи с менеджером.`;

    const response = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${LOVABLE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'google/gemini-2.5-flash',
        messages: [
          { role: 'system', content: systemPrompt },
          ...messages,
        ],
        stream: true,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('AI gateway error:', response.status, errorText);
      
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: 'Слишком много запросов. Пожалуйста, подождите немного.' }),
          { status: 429, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
      
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: 'Сервис временно недоступен. Попробуйте позже.' }),
          { status: 402, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
      
      return new Response(
        JSON.stringify({ error: 'Ошибка AI сервиса' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log('Streaming response from AI gateway');
    return new Response(response.body, {
      headers: { ...corsHeaders, 'Content-Type': 'text/event-stream' },
    });
  } catch (error) {
    console.error('Chat function error:', error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : 'Неизвестная ошибка' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
