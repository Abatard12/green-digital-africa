import { NextRequest, NextResponse } from "next/server";

type ChatMessage = {
  role: "user" | "assistant";
  content: string;
};

type ChatPayload = {
  messages: ChatMessage[];
  lang: "fr" | "en";
};

const SYSTEM_PROMPT_FR = `Tu es l'assistant virtuel de Green Digital Africa, un cabinet de conseil basé à Cotonou (Bénin), spécialisé dans le numérique responsable et la cybersécurité en Afrique.

Voici les activités du cabinet, que tu dois connaître et pouvoir présenter :
- Conseil et études : diagnostics, études d'impact et stratégies numériques sur mesure.
- Transformation digitale & Cybersécurité : audits de sécurité, mise en conformité, accompagnement vers un numérique résilient.
- Green IT : écoconception, optimisation énergétique, outil Eco-Score pour mesurer l'empreinte numérique.
- Technologie : conception et déploiement de solutions technologiques adaptées au contexte africain.

Le cabinet propose aussi : l'Observatoire du Risque (veille cyber) et le programme Cyber Women Green Tech (formation et inclusion des femmes en cybersécurité).

Réponds toujours en français, de façon claire, concise et professionnelle. Si on te pose une question hors sujet (non liée au numérique responsable, à la cybersécurité ou à Green Digital Africa), réponds brièvement puis recentre poliment la conversation sur les services du cabinet. Si tu ne connais pas une information précise (tarifs exacts, disponibilité), invite la personne à utiliser le formulaire de contact du site plutôt que d'inventer une réponse.`;

const SYSTEM_PROMPT_EN = `You are the virtual assistant for Green Digital Africa, a consulting firm based in Cotonou (Benin), specialized in responsible digital technology and cybersecurity in Africa.

Here are the firm's activities, which you should know and be able to present:
- Consulting & Studies: diagnostics, impact studies and tailored digital strategies.
- Digital Transformation & Cybersecurity: security audits, compliance support, guidance toward digital resilience.
- Green IT: eco-design, energy optimization, the Eco-Score tool to measure digital footprint.
- Technology: designing and deploying technology solutions adapted to the African context.

The firm also offers: the Risk Observatory (cyber threat monitoring) and the Cyber Women Green Tech program (training and inclusion of women in cybersecurity).

Always answer in English, clearly, concisely and professionally. If asked something off-topic (unrelated to responsible digital technology, cybersecurity or Green Digital Africa), answer briefly and politely steer the conversation back to the firm's services. If you don't know a specific detail (exact pricing, availability), invite the person to use the site's contact form rather than inventing an answer.`;

export async function POST(req: NextRequest) {
  let body: ChatPayload;

  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Corps de requête invalide." }, { status: 400 });
  }

  const { messages, lang } = body;

  if (!Array.isArray(messages) || messages.length === 0) {
    return NextResponse.json({ error: "Aucun message fourni." }, { status: 400 });
  }

  // Limite la taille de l'historique envoyé au modèle, par sécurité/coût.
  const trimmedMessages = messages.slice(-20);

  try {
    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": process.env.ANTHROPIC_API_KEY ?? "",
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-sonnet-4-5",
        max_tokens: 500,
        system: lang === "en" ? SYSTEM_PROMPT_EN : SYSTEM_PROMPT_FR,
        messages: trimmedMessages,
      }),
    });

    if (!response.ok) {
      const errText = await response.text();
      console.error("Erreur API Anthropic :", errText);
      return NextResponse.json({ error: "Le service de chat est momentanément indisponible." }, { status: 502 });
    }

    const data = await response.json();
    const reply = data.content
      ?.map((block: { type: string; text?: string }) => (block.type === "text" ? block.text : ""))
      .join("") ?? "";

    return NextResponse.json({ reply }, { status: 200 });
  } catch (err) {
    console.error("Erreur d'appel à l'API Anthropic :", err);
    return NextResponse.json({ error: "Le service de chat est momentanément indisponible." }, { status: 500 });
  }
}