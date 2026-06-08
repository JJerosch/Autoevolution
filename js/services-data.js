/* ============================================================
   AUTO EVOLUTION — Dados de Serviços (Fallback para file:// protocol)
   Mantenha em sincronia com data/services.json
   ============================================================ */

window.SERVICES_DATA = {
  "featured": [
    {
      "id": "lavagem",
      "number": "01",
      "name": "Lavagem Automotiva Detalhada",
      "tagline": "Limpeza técnica de verdade",
      "description": "Lavagem detalhada com técnicas e produtos profissionais, da carroceria ao motor, devolvendo o aspecto de zero quilômetro com total segurança para a pintura.",
      "highlights": [
        "Lavagem nano-reativa, ferrosa e descontaminação química",
        "Lavagem de motor detalhada e segura",
        "Higienização interna e acabamento impecável",
        "Produtos premium que preservam pintura e vernizes"
      ]
    },
    {
      "id": "insulfilm-ceramico",
      "number": "02",
      "name": "Insulfilm Cerâmico ZIVENT ZV90",
      "tagline": "Tecnologia cerâmica híbrida patenteada",
      "description": "A película óptica mais tecnológica da ZIVENT: poliéster de ultra definição revestido por cerâmica híbrida que rejeita calor de forma agressiva sem comprometer a visibilidade.",
      "highlights": [
        "Até 71,7% de rejeição solar total (TSER) e 96,7% de infravermelho",
        "Bloqueio de 99,9% dos raios UVA e UVB",
        "Transparência óptica em ultra definição, sem moiré ou arco-íris",
        "Garantia de 10 anos, única no mercado"
      ]
    },
    {
      "id": "vitrificacao",
      "number": "03",
      "name": "Vitrificação & Revestimento Cerâmico",
      "tagline": "Proteção nano cerâmica de longa duração",
      "description": "Revestimento nano cerâmico (linha Carpro) que forma uma camada protetora sobre a pintura, garantindo brilho profundo, repelência e facilidade de limpeza por anos.",
      "highlights": [
        "Brilho intenso e duradouro com efeito hidrofóbico",
        "Protege pintura, plásticos e couro contra danos",
        "Reduz custos de manutenção e valoriza o veículo",
        "Proteção configurável de 3 meses a 7 anos"
      ]
    }
  ],
  "groups": [
    {
      "id": "estetica",
      "name": "Estética e Detalhamento",
      "icon": "sparkle",
      "description": "Lavagens técnicas, polimento e higienização que devolvem ao veículo o aspecto de zero quilômetro.",
      "services": [
        "Polimento técnico com descontaminação clay-bar",
        "Lavagens especiais (nano-reativa, ferrosa e química)",
        "Higienização interna com oxisanitização por ozônio",
        "Lavagem de motor detalhada",
        "Acabamento espelhado e enceramento",
        "Preparação pré-venda (show room)"
      ],
      "features": []
    },
    {
      "id": "couro",
      "name": "Cuidados com o Couro",
      "icon": "seat",
      "description": "Restauração, pintura e proteção de couro com tecnologia europeia e ajuste de cor em laboratório.",
      "services": [
        "Restauração do couro do volante (made in Europe)",
        "Substituição de couro do volante",
        "Pintura de couro dos assentos com ajuste de cor",
        "Hidratação com fragrância couro novo",
        "Vitrificação nano-cerâmica do couro",
        "Impermeabilização de bancos (tecido ou couro)"
      ],
      "features": []
    },
    {
      "id": "farois",
      "name": "Faróis e Iluminação",
      "icon": "headlight",
      "description": "Restauração, troca de lentes e customização de iluminação no padrão de fábrica e além.",
      "services": [
        "Restauração de faróis e troca de lentes (todas as marcas)",
        "DRL: substituição, instalação e reprogramação",
        "Mini-projetor 24.000 lumens e angel eyes",
        "Projetores laser e customizações de iluminação",
        "Lanternas originais e recuperação interna de projetores"
      ],
      "features": []
    },
    {
      "id": "pintura",
      "name": "Pintura Automotiva",
      "icon": "spray",
      "description": "Pintura padrão de fábrica com ajuste de cor em laboratório, inclusive cores exóticas.",
      "services": [
        "Pintura padrão de fábrica com ajuste de cor",
        "Retoque rápido em 24h",
        "Restauração de verniz",
        "Martelinho de ouro"
      ],
      "features": [
        "Cores exóticas e exclusivas disponíveis"
      ]
    },
    {
      "id": "rodas",
      "name": "Rodas",
      "icon": "wheel",
      "description": "Pintura, diamantagem e reforma completa de rodas com geometria garantida.",
      "services": [
        "Pintura e diamantagem de rodas",
        "Reforma estrutural e estética"
      ],
      "features": [
        "Alinhamento e balanceamento inclusos"
      ]
    },
    {
      "id": "performance",
      "name": "Performance",
      "icon": "gauge",
      "description": "Reprogramação eletrônica para mais potência, resposta e eficiência do motor.",
      "services": [
        "Remap Stage 1 a 4",
        "Piggyback e pedal chip",
        "Eliminação do delay do acelerador",
        "Escapamento downpipe"
      ],
      "features": []
    },
    {
      "id": "peliculas",
      "name": "Películas & Insulfilm",
      "icon": "shield",
      "description": "Linha completa de películas além do ZV90, para conforto térmico e proteção solar.",
      "services": [
        "Película nano cerâmica e carbon",
        "Insulfilm cerâmico híbrido",
        "Película de proteção anti-trinco"
      ],
      "features": [
        "Bloqueio de calor e UV com instalação amigável"
      ]
    },
    {
      "id": "vidros",
      "name": "Vidros & Para-brisa",
      "icon": "glass",
      "description": "Tratamento, restauração e proteção dos vidros para mais visibilidade e segurança ao dirigir.",
      "services": [
        "Restauração e polimento de para-brisa",
        "Cristalização e repelente de chuva nos vidros",
        "Remoção de riscos e manchas do vidro",
        "Reparo de pequenas trincas e impactos"
      ],
      "features": []
    },
    {
      "id": "blindagem",
      "name": "Blindagem",
      "icon": "lock",
      "description": "Blindagem homologada pelo Exército Brasileiro com os mais altos padrões de segurança.",
      "services": [],
      "features": [
        "Blindagem Nível III-A",
        "Homologação pelo Exército Brasileiro",
        "Certificação ISO 9001",
        "Associada à Abralim"
      ]
    },
    {
      "id": "especiais",
      "name": "Serviços Especiais",
      "icon": "star",
      "description": "Trabalhos delicados e sob medida para raridades, elétricos e projetos de customização.",
      "services": [
        "Reparo de carregador automotivo (BYD e elétricos)",
        "Customizações sob medida (snorkel, projetos completos)",
        "Kit prevenção PPF em pontos estratégicos"
      ],
      "features": [
        "Atendimento a veículos de coleção e raridades"
      ]
    }
  ]
};
