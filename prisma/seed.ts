import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  await prisma.comment.deleteMany({})
  await prisma.post.deleteMany({})
  await prisma.adminUser.deleteMany({})

  const postsData = [
    // Tecnologia (7 posts)
    {
      title: 'Inteligência Artificial revoluciona diagnóstico médico',
      category: 'Tecnologia',
      excerpt: 'Pesquisadores desenvolvem sistema de IA capaz de detectar doenças com precisão de 99% em imagens médicas.',
      content: `# Inteligência Artificial Revoluciona Diagnóstico Médico

## Avanço Significativo na Medicina Diagnóstica

Um novo sistema de inteligência artificial desenvolvido por pesquisadores de universidades renomadas conseguiu alcançar uma taxa de acurácia de 99% na detecção de doenças em imagens radiológicas. Este avanço promete transformar completamente a forma como os médicos diagnosticam enfermidades graves.

## Tecnologia de Deep Learning

O algoritmo utiliza redes neurais profundas treinadas com mais de 500 mil imagens de exames médicos. O sistema foi capaz de identificar sinais de câncer, pneumonia e outras condições sérias antes mesmo que radiologistas experientes conseguissem detectar.

## Aplicações Práticas

Hospitais ao redor do mundo já começam a implementar esta tecnologia em suas rotinas. Os benefícios incluem:

- Diagnóstico mais rápido
- Redução de erros humanos
- Menor custo para pacientes
- Melhor prognóstico através da detecção precoce

## Futuro da Medicina

Especialistas acreditam que a integração de IA com sistemas de saúde é apenas o começo de uma revolução diagnóstica que pode salvar milhões de vidas nos próximos anos.`,
      author: 'Dr. Carlos Oliveira',
    },
    {
      title: 'Apple anuncia novo MacBook com chip revolucionário',
      category: 'Tecnologia',
      excerpt: 'Novo processador promete 50% mais desempenho e 60% menos consumo de energia em comparação com a geração anterior.',
      content: `# Apple Anuncia Novo MacBook com Chip Revolucionário

## Lançamento do Chip M5

A Apple apresentou seu mais novo e poderoso processador, o chip M5, que marca um passo gigante na evolução dos computadores pessoais. Com uma arquitetura completamente redesenhada, o novo chip promete redefinir os padrões da indústria.

## Especificações Impressionantes

O M5 oferece:

\`\`\`
Cores de CPU: 12
Cores de GPU: 20
Memória compartilhada: até 128GB
Velocidade: até 4.2 GHz
\`\`\`

## Desempenho Excepcional

Testes preliminares mostram que o novo MacBook pode executar aplicações profissionais como edição de vídeo 8K em tempo real, renderização 3D complexa e processamento de dados em larga escala sem qualquer engasgamento.

## Eficiência Energética

Apesar do aumento massivo em desempenho, o consumo de energia foi reduzido significativamente, permitindo que o MacBook funcione por até 22 horas com uma única carga de bateria.

## Disponibilidade

Os novos MacBooks com chip M5 estarão disponíveis a partir do próximo mês em todas as lojas Apple e varejistas autorizados.`,
      author: 'Marina Santos',
    },
    {
      title: 'Google apresenta avanços em computação quântica',
      category: 'Tecnologia',
      excerpt: 'Empresa alcança novo recorde em processamento quântico, demonstrando supremacia quântica em problemas práticos.',
      content: `# Google Apresenta Avanços Revolucionários em Computação Quântica

## Novo Recorde em Processamento Quântico

O Google anunciou importantes avanços em sua pesquisa de computação quântica, alcançando um novo recorde de 1000 qubits coerentes com erro controlado. Este avanço representa um marco importante na jornada em direção a computadores quânticos práticos e úteis.

## Supremacia Quântica Demonstrada

O novo processador quântico consegue resolver problemas matemáticos complexos que levariam aproximadamente 10 mil anos para um computador clássico resolver em apenas 3 minutos.

## Aplicações Práticas em Desenvolvimento

Os pesquisadores já estão trabalhando em aplicações concretas:

- Desenvolvimento de novos medicamentos
- Otimização de processos industriais
- Simulação de moléculas complexas
- Criptografia segura

## Implicações para o Futuro

Este avanço coloca a empresa mais próxima de desenvolver computadores quânticos capazes de resolver problemas reais que beneficiem a sociedade em campos como medicina, energia limpa e inteligência artificial.`,
      author: 'Professor Lucas Ferreira',
    },
    {
      title: 'Meta investe bilhões no metaverso enquanto reduz equipe',
      category: 'Tecnologia',
      excerpt: 'Empresa anuncia corte de 20 mil funcionários mas mantém investimento em realidade virtual imersiva.',
      content: `# Meta Investe Bilhões no Metaverso Enquanto Reduz Equipe

## Reorganização Estratégica

A Meta anunciou uma reestruturação significativa, reduzindo sua força de trabalho em 20%, enquanto mantém um compromisso inabalável com o desenvolvimento do metaverso. A empresa justifica a decisão como parte de uma "refocagem" em prioridades estratégicas.

## Investimento Contínuo no Metaverso

Apesar dos cortes de pessoal, a Meta continua a investir bilhões de dólares anualmente em:

- Desenvolvimento de headsets VR/AR
- Infraestrutura de rede
- Experiências imersivas
- Ferramentas para criadores

## Reação do Mercado

A decisão gerou reações mistas. Enquanto alguns analistas veem a reestruturação como necessária, outros questionam se o metaverso é realmente o futuro para a empresa.

## Visão de Futuro

Os líderes da Meta acreditam que o metaverso representará a próxima grande evolução da internet e está apostando no seu potencial de longo prazo, mesmo diante dos desafios atuais.`,
      author: 'Roberto Alves',
    },
    {
      title: 'Microsoft integra ChatGPT em todos os seus produtos',
      category: 'Tecnologia',
      excerpt: 'Gigante de tecnologia expande parceria com OpenAI para trazer IA generativa a Office, Windows e mais.',
      content: `# Microsoft Integra ChatGPT em Todos os Seus Produtos

## Parceria Estratégica Expandida

A Microsoft anunciou uma integração completa do ChatGPT em seu ecossistema de produtos, começando com Office 365, Windows, Azure e muito mais. Esta é uma das maiores expansões de integração de IA jamais realizadas.

## Recursos Inovadores

Usuários de produtos Microsoft agora podem:

- Usar IA para escrever e-mails profissionais no Outlook
- Gerar apresentações automáticas no PowerPoint
- Analisar dados com assistência de IA no Excel
- Codificar com sugestões inteligentes no Visual Studio

## Impacto na Produtividade

Estimativas iniciais sugerem que a integração de IA pode aumentar a produtividade dos usuários em até 40%, especialmente em tarefas de escrita e análise.

## Segurança e Privacidade

A Microsoft assegurou que todos os dados dos usuários permanecerão privados e seguro, com criptografia de ponta a ponta em todas as comunicações com os sistemas de IA.

## Disponibilidade Gradual

A integração será implementada gradualmente ao longo dos próximos meses, com versões beta já disponíveis para usuários inscritos no programa de testes.`,
      author: 'Ana Patricia',
    },
    {
      title: 'StartUp brasileira cria drone autônomo para agricultura',
      category: 'Tecnologia',
      excerpt: 'Empresa de São Paulo desenvolve tecnologia inovadora para monitoramento e pulverização de lavouras com inteligência artificial.',
      content: `# StartUp Brasileira Cria Drone Autônomo para Agricultura

## Inovação no Agronegócio Brasileiro

Uma startup baseada em São Paulo desenvolveu um drone autônomo capaz de monitorar grandes áreas agrícolas e realizar pulverizações com precisão milimétrica usando inteligência artificial. A tecnologia promete revolucionar a forma como os agricultores trabalham.

## Características Técnicas

O drone foi desenvolvido com:

- Câmeras multiespectrais para análise de solo e plantas
- GPS de precisão centimétrica
- Algoritmos de IA para detecção de pragas
- Tanque para pulverização com 15 litros de capacidade
- Bateria de longa duração (até 8 horas)

## Benefícios para Agricultores

- Redução de até 60% no uso de agrotóxicos
- Economia de tempo em inspeção de lavouras
- Aumento de produtividade em 35%
- Menor impacto ambiental

## Expansão Planejada

A empresa já recebeu investimento de fundos de capital de risco e planeja expandir para 15 países na América Latina em 2024.`,
      author: 'Felipe Rodrigues',
    },
    {
      title: 'Novo console de videogame rompe recordes de venda',
      category: 'Tecnologia',
      excerpt: 'Console revolucionário atinge 10 milhões de unidades vendidas em apenas 2 meses de lançamento.',
      content: `# Novo Console de Videogame Rompe Recordes de Venda

## Lançamento Estrondoso

O novo console de uma fabricante de games anunciou que atingiu a marca de 10 milhões de unidades vendidas em apenas 2 meses, batendo todos os recordes anteriores da indústria de videogames.

## Razões do Sucesso

O console oferece:

- Processamento 4K nativo
- Taxa de atualização de 240 FPS
- Compatibilidade com biblioteca de games anterior
- Novo controlador revolucionário
- Preço competitivo

## Catálogo de Jogos Impressionante

Mais de 500 jogos foram lançados ou já estão em desenvolvimento para a plataforma, incluindo títulos exclusivos muito aguardados.

## Impacto na Indústria

O sucesso do console forçou competidores a reconsiderar suas estratégias e a investir mais em inovação e desenvolvimento de games exclusivos.

## Futuro Promissor

Analistas preveem que este console dominará o mercado de games pelos próximos 5 a 7 anos, com potencial para vender mais de 200 milhões de unidades.`,
      author: 'Gamer Pro',
    },

    // Economia (7 posts)
    {
      title: 'Bolsa de valores atinge novo recorde histórico',
      category: 'Economia',
      excerpt: 'Índice principal fecha em seu melhor desempenho anual, impulsionado por recuperação econômica global.',
      content: `# Bolsa de Valores Atinge Novo Recorde Histórico

## Fechamento em Alta

A bolsa de valores registrou seu melhor desempenho anual, com o índice principal fechando em novo recorde histórico. Os ganhos refletem otimismo com a recuperação econômica global e expectativas positivas para os próximos trimestres.

## Setores em Destaque

Os principais ganhadores foram:

- Tecnologia: +25%
- Saúde: +18%
- Energia: +15%
- Finanças: +22%

## Análise de Especialistas

Analistas apontam que o crescimento foi impulsionado por:

- Recuperação do mercado de trabalho
- Redução da inflação em vários países
- Aumento dos lucros corporativos
- Otimismo dos investidores

## Perspectivas para 2024

A maioria dos analistas mantém perspectivas positivas para o ano que vem, estimando crescimento adicional de 12 a 18%.

## Oportunidades de Investimento

Especialistas recomendam:

- Diversificação de portfólio
- Foco em empresas com fundamentos sólidos
- Acompanhamento de tendências de mercado
- Consultoria com profissionais especializados`,
      author: 'Analista Financeiro Sênior',
    },
    {
      title: 'Startup de fintech recebe investimento bilionário',
      category: 'Economia',
      excerpt: 'Plataforma de pagamentos digital fecha série de funding no maior valor já visto no setor.',
      content: `# Startup de Fintech Recebe Investimento Bilionário

## Maior Rodada de Financiamento do Setor

Uma startup brasileira de fintech anunciou que fechou sua última rodada de investimento com um valuation de $5 bilhões, tornando-a um "unicórnio" e confirmando seu status como uma das empresas de tecnologia mais promissoras da América Latina.

## Plataforma Revolucionária

A empresa oferece:

- Transações instantâneas com taxa zero
- Integração com criptomoedas
- Empréstimos com aprovação em 5 minutos
- Investimentos automatizados

## Impacto no Mercado

Este investimento coloca a startup como um dos principais disruptores do setor financeiro tradicional e abre caminho para:

- Expansão internacional
- Desenvolvimento de novos produtos
- Contratação de mais 2.000 profissionais
- Infraestrutura de tecnologia de classe mundial

## Futuro Previsto

Analistas estimam que a empresa pode chegar ao valor de $20 bilhões em 3 anos, potencialmente liderando a transformação digital do mercado financeiro.`,
      author: 'Investidor Tech',
    },
    {
      title: 'Inflação cai para menor nível em 2 anos',
      category: 'Economia',
      excerpt: 'Índice de preços ao consumidor mostra redução significativa, oferecendo alívio para famílias brasileiras.',
      content: `# Inflação Cai para Menor Nível em 2 Anos

## Alívio Econômico

A inflação oficial do país caiu para 4.2% ao ano, atingindo seu menor patamar em 24 meses. Este resultado oferece alívio considerável para famílias e empresas que enfrentavam preços crescentes.

## Componentes da Queda

Os principais fatores que contribuíram para a redução foram:

- Alimentos mais acessíveis: -8%
- Combustíveis com menor volatilidade: +2%
- Energia elétrica em redução: -3%
- Transportes mais baratos: -2%

## Impacto na Renda Familiar

Com a queda da inflação, o poder de compra das famílias aumenta automaticamente, permitindo:

- Mais acesso a alimentos essenciais
- Redução do endividamento
- Maior poupança
- Melhor qualidade de vida

## Decisões de Investidores

Instituições financeiras já começam a ajustar suas estratégias, com expectativas de redução nas taxas de juros nos próximos meses.

## Perspectivas Futuras

O Banco Central mantém projeção otimista para os próximos trimestres, estimando que a inflação se mantenha controlada se as condições externas permanecerem favoráveis.`,
      author: 'Economista-Chefe',
    },
    {
      title: 'Fusão entre dois bancos cria gigante financeiro',
      category: 'Economia',
      excerpt: 'Operação bilionária une dois dos maiores bancos do país, criando instituição com ativos de $200 bilhões.',
      content: `# Fusão Entre Dois Bancos Cria Gigante Financeiro

## Maior Fusão Bancária da Década

Dois dos maiores bancos do país anunciaram sua fusão em uma operação avaliada em mais de $50 bilhões. A nova entidade se tornará a maior instituição financeira da América Latina com ativos totais de $200 bilhões.

## Benefícios Esperados

A fusão promete:

- Mais serviços aos clientes
- Menores taxas de operação
- Tecnologia mais avançada
- Maior acessibilidade em áreas rurais
- Maior poder competitivo global

## Sinergia Operacional

Especialistas estimam que a fusão pode gerar eficiências operacionais de até $5 bilhões ao longo de 3 anos, através de:

- Consolidação de sistemas
- Eliminação de redundâncias
- Otimização de processos
- Inovação tecnológica

## Aprovação Regulatória

As autoridades regulatórias aprovaram a operação após análise detalhada, considerando que os benefícios para os consumidores superam as possíveis preocupações concorrenciais.

## Implementação

A integração será gradual e deve ser completada em 18 meses, com promessas de mantém empregos e ampliar serviços.`,
      author: 'Jornalista Econômico',
    },
    {
      title: 'Brasil lidera crescimento econômico na América Latina',
      category: 'Economia',
      excerpt: 'País atinge taxa de crescimento de 6.2%, superando projeções e liderando região em desenvolvimento.',
      content: `# Brasil Lidera Crescimento Econômico na América Latina

## Desempenho Impressionante

O Brasil registrou um crescimento econômico de 6.2% nos últimos 12 meses, superando todas as projeções e consolidando sua posição como a economia que mais cresce na América Latina.

## Setores Impulsionadores

O crescimento foi distribuído por:

- Agronegócio: +8%
- Indústria: +5%
- Serviços: +6%
- Exportações: +15%

## Criação de Empregos

O crescimento econômico resultou na criação de 1.2 milhões de novos empregos, reduzindo o desemprego para seu menor nível em 5 anos.

## Investimento Estrangeiro

Empresas internacionais aumentaram seus investimentos no país em 40%, atraídas pelas oportunidades econômicas e pelo potencial de crescimento.

## Perspectivas Futuras

Analistas projetam que o Brasil pode manter uma taxa de crescimento entre 4% e 5% nos próximos 3 anos, consolidando-se como uma das economias mais dinâmicas da região.

## Desafios Persistentes

Apesar do sucesso, ainda há desafios a superar, como redução da desigualdade de renda e melhoria dos serviços públicos.`,
      author: 'Ministério da Economia',
    },
    {
      title: 'Criptomoredas recuperam valor após período de volatilidade',
      category: 'Economia',
      excerpt: 'Bitcoin ultrapassa $40 mil enquanto mercado cripto mostra sinais de estabilização e crescimento.',
      content: `# Criptomoedas Recuperam Valor Após Período de Volatilidade

## Recuperação do Mercado

As criptomoedas voltaram a ganhar força após um período de volatilidade, com Bitcoin ultrapassando a marca de $40 mil e Ethereum recuperando-se para $2.500. O mercado cripto movimenta agora mais de $1.2 trilhões em valor total.

## Fatores da Recuperação

A recuperação foi impulsionada por:

- Aprovação de ETFs de Bitcoin em vários países
- Adoção corporativa aumentada
- Interesse institucional renovado
- Melhoria da infraestrutura regulatória

## Perspectivas Positivas

Analistas apontam que:

- A adoção de criptomoedas continua crescendo
- Novos casos de uso surgem regularmente
- A tecnologia blockchain se consolida
- Empresas tradicionais abraçam o setor

## Análise Técnica

A análise técnica sugere que o mercado pode continuar em alta, com possibilidade de atingir novos recordes nos próximos trimestres.

## Alertas e Recomendações

Investidores são aconselhados a:

- Diversificar suas carteiras
- Entender os riscos envolvidos
- Não investir mais do que podem perder
- Usar plataformas seguras e reguladas`,
      author: 'Analista Cripto',
    },

    // Saúde (7 posts)
    {
      title: 'Novo tratamento cura 95% dos casos de câncer de pâncreas',
      category: 'Saúde',
      excerpt: 'Pesquisadores desenvolvem imunoterapia revolucionária que mostra resultados promissores em ensaios clínicos.',
      content: `# Novo Tratamento Cura 95% dos Casos de Câncer de Pâncreas

## Avanço Revolucionário

Pesquisadores anunciaram um avanço extraordinário no tratamento do câncer de pâncreas, com um novo tratamento imunológico alcançando uma taxa de cura de 95% em ensaios clínicos fase II.

## Descrição do Tratamento

O novo tratamento utiliza:

- Células T modificadas geneticamente
- Terapia direcionada contra proteínas do câncer
- Combinação com imunoterapia
- Suporte nutricional personalizado

## Resultados Impressionantes

Dos 200 pacientes no estudo:

- 190 entraram em remissão completa
- 180 mantêm remissão após 2 anos
- Efeitos colaterais mínimos foram registrados
- Qualidade de vida significativamente melhorada

## Significado para Pacientes

Este tratamento pode transformar o prognóstico do câncer de pâncreas, que historicamente tinha taxa de sobrevida de apenas 10% em 5 anos.

## Próximas Etapas

O tratamento deve passar por fase III de ensaios clínicos e pode estar disponível para pacientes dentro de 18 meses.`,
      author: 'Dr. Patricia Mendes',
    },
    {
      title: 'Exercício físico reduz risco de doenças cardíacas em 40%',
      category: 'Saúde',
      excerpt: 'Grande estudo mostra que 30 minutos diários de atividade física podem reduzir significativamente riscos cardiovasculares.',
      content: `# Exercício Físico Reduz Risco de Doenças Cardíacas em 40%

## Estudo Abrangente

Um novo estudo envolvendo 50.000 participantes confirmou que praticar 30 minutos de exercício físico diário pode reduzir o risco de doenças cardíacas em até 40%, e o risco de morte prematura em 25%.

## Tipos de Exercício Recomendados

O estudo mostrou que todos os tipos de exercício foram benéficos:

- Caminhada rápida
- Corrida leve
- Ciclismo
- Natação
- Musculação

## Benefícios Adicionais

Além da saúde cardiovascular, o exercício regular também:

- Melhora saúde mental
- Reduz ansiedade e depressão em 30%
- Melhora qualidade do sono
- Aumenta longevidade em até 5 anos
- Previne diabetes tipo 2

## Recomendações da OMS

A Organização Mundial de Saúde atualizou suas diretrizes recomendando:

- Mínimo 150 minutos de exercício moderado por semana
- Ou 75 minutos de exercício intenso
- Mais atividades de fortalecimento muscular 2x por semana

## Começando a Fazer Exercício

Especialistas recomendam começar lentamente e aumentar a intensidade gradualmente, consultando sempre um médico antes de iniciar novos programas de exercício.`,
      author: 'Dr. João Silva',
    },
    {
      title: 'OMS alerta sobre nova variante de vírus respiratório',
      category: 'Saúde',
      excerpt: 'Organização Mundial de Saúde monitora nova variante com transmissibilidade aumentada em 30%.',
      content: `# OMS Alerta Sobre Nova Variante de Vírus Respiratório

## Vigilância Global Ativa

A Organização Mundial de Saúde emitiu alerta sobre uma nova variante de um vírus respiratório comum que mostra transmissibilidade 30% maior que suas predecessoras, mas com severidade similar.

## Características da Variante

A nova variante apresenta:

- Transmissibilidade aumentada
- Período de incubação mais curto (2-3 dias)
- Sintomas leves a moderados na maioria dos casos
- Baixa taxa de hospitalização em população vacinada

## Medidas de Prevenção

As autoridades recomendam:

- Uso de máscaras em locais fechados
- Higiene frequente de mãos
- Ventilação adequada de ambientes
- Vacinação e reforços em dia

## Monitoramento Global

Laboratórios em 150 países monitoram a variante através de sequenciamento genético e testes diagnósticos.

## Situação Atual

Até o momento, a nova variante foi detectada em 45 países e causa infecções leves na maioria dos casos. Hospitais não estão sobrecarregados e sistemas de saúde estão preparados.`,
      author: 'Dra. WHO',
    },
    {
      title: 'Alimentos ultraprocessados aumentam depressão em 40%',
      category: 'Saúde',
      excerpt: 'Pesquisa revela que consumo excessivo de alimentos ultraprocessados está associado ao aumento de transtornos mentais.',
      content: `# Alimentos Ultraprocessados Aumentam Depressão em 40%

## Descoberta Alarmante

Uma grande metanálise de 23 estudos envolvendo 500.000 pessoas mostrou que consumo excessivo de alimentos ultraprocessados aumenta o risco de depressão em 40%, independentemente de outros fatores de risco.

## Mecanismos Envolvidos

Os pesquisadores identificaram vários mecanismos:

- Inflamação no organismo
- Desequilíbrio da microbiota intestinal
- Ausência de nutrientes essenciais
- Aditivos químicos prejudiciais
- Obesidade induzida

## Alimentos de Maior Risco

Os maiores vilões foram:

- Refrigerantes açucarados
- Alimentos fritos
- Fast food
- Alimentos com conservantes
- Bebidas energéticas

## Recomendações Nutricionais

Nutricionistas recomendam:

- Priorizar alimentos naturais e integrais
- Reduzir açúcar refinado
- Aumentar consumo de frutas e vegetais
- Escolher alimentos processados minimamente
- Beber mais água

## Benefícios da Mudança

Pessoas que fizeram a transição para dieta mais saudável:

- Relataram melhora de 35% nos sintomas de depressão
- Aumento de energia e bem-estar
- Melhoria da qualidade do sono
- Redução do peso corporal`,
      author: 'Nutricionista Maria',
    },
    {
      title: 'Vacina contra dengue é aprovada para uso em crianças',
      category: 'Saúde',
      excerpt: 'Órgãos reguladores aprovam novo imunizante que oferece proteção contra os quatro sorotipos do vírus.',
      content: `# Vacina Contra Dengue é Aprovada para Uso em Crianças

## Marco Histórico

A Agência Nacional de Vigilância Sanitária aprovou a primeira vacina tetravalente contra dengue para uso em crianças a partir de 4 anos de idade. A aprovação representa um avanço significativo no combate à doença.

## Eficácia da Vacina

A vacina demonstra:

- Eficácia de 88% contra dengue grave
- Proteção contra os 4 sorotipos do vírus
- Eficácia de 73% contra infecção geral
- Efeitos colaterais mínimos

## Esquema de Vacinação

O esquema consiste em:

- Primeira dose: dose inicial
- Segunda dose: 3 meses depois
- Terceira dose: 6 meses após a primeira dose
- Reforço recomendado após 1 ano

## Impacto Esperado

A vacinação em massa pode:

- Reduzir casos de dengue em até 50%
- Diminuir internações hospitalares
- Economizar recursos de saúde
- Proteger grupos vulneráveis

## Início da Campanha

A vacinação será incluída no calendário de vacinação nacional a partir do próximo ano, com prioridade para crianças em áreas com alta transmissão.`,
      author: 'Epidemiologista Sênior',
    },
    {
      title: 'Meditação reduz ansiedade tão bem quanto medicamentos',
      category: 'Saúde',
      excerpt: 'Estudo clínico mostra que meditação diária é tão eficaz quanto ansiolíticos no controle da ansiedade.',
      content: `# Meditação Reduz Ansiedade Tão Bem Quanto Medicamentos

## Comprovação Científica

Um estudo randomizado e duplo-cego da Universidade de Stanford mostrou que meditação diária é tão eficaz quanto medicamentos ansiolíticos no controle da ansiedade, sem os efeitos colaterais.

## Resultados do Estudo

Nos participantes que praticaram meditação:

- 65% tiveram redução significativa de ansiedade
- 58% descontinuaram medicação com segurança
- Melhoria mantida por 12 meses após término do estudo
- Aumento de bem-estar geral

## Como Funciona a Meditação

A meditação age através de:

- Redução da atividade amigdaliana
- Aumento da atividade no córtex pré-frontal
- Redução de hormônios do estresse
- Aumento de ondas cerebrais alfa
- Melhoria de neuroplasticidade

## Técnicas Recomendadas

As mais eficazes foram:

- Meditação mindfulness: 20 minutos diários
- Respiração diafragmática: 10 minutos
- Yoga: 30 minutos, 3 vezes por semana
- Tai Chi: 20 minutos, 2-3 vezes por semana

## Acessibilidade

Aplicativos gratuitos e pago fornecem:

- Guias de meditação
- Aulas em tempo real
- Comunidades de suporte
- Rastreamento de progresso`,
      author: 'Dr. Mindfulness',
    },

    // Ciência (7 posts)
    {
      title: 'Telescópio espacial descobre sistema solar com 8 planetas similares à Terra',
      category: 'Ciência',
      excerpt: 'Novo achado revoluciona busca por vida extraterrestre, aumentando esperança de encontrar civilizações fora do sistema solar.',
      content: `# Telescópio Espacial Descobre Sistema Solar com 8 Planetas Similares à Terra

## Descoberta Histórica

O telescópio espacial James Webb identificou um novo sistema solar a 45 anos-luz da Terra contendo 8 planetas potencialmente habitáveis, todos em zona habitável de sua estrela.

## Características dos Planetas

Os planetas apresentam:

- Raio similar ao da Terra
- Presença de água em forma sólida e/ou líquida
- Possível atmosfera contendo oxigênio
- Temperatura média adequada para vida
- Densidade compatível com planetas rochosos

## Sistema Estelar

A estrela central é:

- Levemente mais pequena que o Sol
- Muito mais estável que o previsto
- Idade estimada de 5 bilhões de anos
- Rodeada por disco de poeira indicando formação planetária ativa

## Implicações para Astrobiologia

Esta descoberta sugere que:

- Sistemas similares ao nosso são comuns
- Há bilhões de locais potencialmente habitáveis
- Vida extraterrestre pode ser comum no universo
- Futuras missões de exploração devem investigar

## Próximas Etapas

Os astrônomos planificam:

- Análise espectroscópica detalhada
- Observação contínua para sinais biossinatura
- Desenvolvimento de tecnologia para visitação futura
- Revisão de compreensão sobre origem da vida`,
      author: 'Astrônomo-Chefe',
    },
    {
      title: 'Cientistas conseguem teletransportar informações quânticas pela primeira vez',
      category: 'Ciência',
      excerpt: 'Experimento histórico demonstra teletransporte quântico em distância de 100 quilômetros através de rede urbana.',
      content: `# Cientistas Conseguem Teletransportar Informações Quânticas Pela Primeira Vez

## Avanço Revolucionário

Pesquisadores da Academia de Ciências da China realizaram o primeiro teletransporte bem-sucedido de informação quântica através de uma rede urbana de 100 quilômetros, marcando um marco importante na computação quântica prática.

## Como Funciona

O experimento utiliza:

- Emaranhamento quântico entre fótons
- Transmissão através de fibra óptica
- Medições quânticas coordenadas
- Reconstrução do estado quântico no destino

## Resultados Alcançados

Os cientistas conseguiram:

- Taxa de sucesso de 87% em transferência
- Qualidade de fidelidade de 94%
- Distância de transmissão de 100 km
- Demonstração de repetibilidade

## Aplicações Práticas

Esta tecnologia pode levar a:

- Redes de computadores quânticos
- Internet quântica do futuro
- Criptografia teoricamente inquebrável
- Comunicação instantânea de longa distância

## Caminho para a Internet Quântica

Os pesquisadores planejam:

- Expandir distância de teletransporte
- Conectar múltiplos nós de rede
- Criar primeira rede quântica urbana
- Eventualmente conectar continentes`,
      author: 'Dr. Quantum',
    },
    {
      title: 'Mudanças climáticas podem desacelerar em próxima década',
      category: 'Ciência',
      excerpt: 'Modelos climáticos mostram sinais de estabilização do aquecimento global se emissões continuarem reduzindo.',
      content: `# Mudanças Climáticas Podem Desacelerar em Próxima Década

## Análise Otimista

Um novo relatório do Painel Intergovernamental sobre Mudanças Climáticas sugere que o aquecimento global pode desacelerar significativamente na próxima década se as emissões de carbono continuarem diminuindo no ritmo atual.

## Dados Positivos

Os modelos mostram:

- Redução global de emissões: 15% em 2 anos
- Aumento de energia renovável: 45% de todo suprimento
- Reflorestamento progressivo: 3 bilhões de árvores plantadas
- Sucesso em tecnologias de captura de carbono

## Cenários Futuros

Se tendências continuar:

- Aquecimento de apenas 2.1°C até 2100 (vs 3°C sem ação)
- Estabilização de níveis de CO2
- Recuperação de ecossistemas
- Reversão de alguns efeitos

## Necessidade Contínua

Apesar da esperança, especialistas alertam que:

- Esforços devem continuar e intensificar
- Transição para energia limpa é imperativa
- Proteção de florestas é crítica
- Todos os setores devem participar

## Contribuição Individual

Pessoas podem ajudar através de:

- Redução de consumo de energia
- Escolha de transportes sustentáveis
- Apoio a políticas climáticas
- Divulgação de informações científicas`,
      author: 'Climatologista',
    },
    {
      title: 'Fossilização rápida preserva novo fóssil de dinossauro intacto',
      category: 'Ciência',
      excerpt: 'Descoberta rara de esqueleto completo permite estudo detalhado de espécie não catalogada previamente.',
      content: `# Fossilização Rápida Preserva Novo Fóssil de Dinossauro Intacto

## Descoberta Excepcional

Paleontólogos descobriram um fóssil praticamente completo de uma nova espécie de dinossauro em perfeito estado de preservação na Patagônia. O esqueleto é considerado um dos melhores jamais encontrados.

## Características da Espécie

O dinossauro apresenta:

- Tamanho: 12 metros de comprimento
- Período: Cretáceo médio (100 milhões de anos)
- Herbívoro de porte médio
- Crânio com características únicas
- Patas traseiras particularmente fortes

## Processo de Fossilização

O fóssil foi preservado através de:

- Soterramento rápido em lama vulcânica
- Mineralização completa de ossos
- Proteção de fatores externos
- Condições de pH estável

## Importância Científica

A descoberta permite:

- Estudo detalhado de anatomia
- Compreensão de comportamento
- Conexões evolutivas com outras espécies
- Datação precisa de camadas geológicas

## Reconstrução Digital

Pesquisadores criaram modelo 3D do esqueleto que será:

- Exposto em museu nacional
- Disponível para pesquisa em todo mundo
- Utilizado em educação paleontológica
- Base para futuras descobertas`,
      author: 'Paleontólogo Sênior',
    },
    {
      title: 'Física de partículas confirma nova força fundamental',
      category: 'Ciência',
      excerpt: 'Experimentos em acelerador de partículas detectam evidência de quinta força da natureza.',
      content: `# Física de Partículas Confirma Nova Força Fundamental

## Descoberta Revolucionária

Cientistas do CERN anunciaram confirmação de uma possível quinta força fundamental da natureza, abrindo novos horizontes para a física teórica e possíveis aplicações tecnológicas.

## A Força Descoberta

A nova força:

- Opera em escala subatômica
- Interage com bosões X
- Pode estar conectada à matéria escura
- Deve ser incorporada em modelos padrão

## Importância da Descoberta

Este achado:

- Desafia modelo padrão da física
- Pode explicar matéria escura (95% do universo)
- Abre caminho para tecnologias futuras
- Confirma predições teóricas antigas

## Experimentos Realizados

Os cientistas utilizaram:

- Acelerador de partículas de 27 km
- Detectores de alta sensibilidade
- Análise de colisões de partículas
- Múltiplas confirmações independentes

## Implicações Teóricas

A descoberta sugere:

- Estrutura mais profunda da realidade
- Possível unificação de forças
- Novos fenômenos físicos a descobrir
- Revisão de nossa compreensão do universo

## Próximas Investigações

Pesquisadores planejam:

- Estudar propriedades da força
- Buscar mediadores da interação
- Investigar ligações com matéria escura
- Desenvolver aplicações práticas`,
      author: 'Físico de Partículas',
    },

    // Esportes (6 posts)
    {
      title: 'Futebolista quebra recorde de gols na competição continental',
      category: 'Esportes',
      excerpt: 'Craque marca seu 150º gol em competições continentais, consolidando seu legado como um dos maiores artilheiros do futebol.',
      content: `# Futebolista Quebra Recorde de Gols em Competição Continental

## Marca Histórica Atingida

Um dos maiores futebolistas de todos os tempos marcou seu 150º gol em competições continentais, quebrando o recorde anterior e consolidando seu lugar entre os maiores artilheiros da história do futebol.

## Carreira Brilhante

O jogador conquistou:

- 150 gols em competições continentais
- 800+ gols em toda carreira
- 5 Prêmios da Melhor Jogador
- Múltiplos campeonatos nacionais
- Participação em 5 Copas do Mundo

## Jogo do Recorde

No jogo memorável:

- Hat-trick (3 gols) marcado
- Assistência para outro gol
- Performance de classe mundial
- Recebimento de ovação
- Reconhecimento histórico

## Legado do Jogador

Seu impacto inclui:

- Inspiração para gerações futuras
- Evolução do jogo de ataque
- Recordes de eficiência pessoal
- Desenvolvimento do futebol mundial
- Ícone cultural global

## Análise Técnica

Especialistas apontam que o sucesso deve-se a:

- Técnica apurada
- Inteligência tática
- Mentalidade competitiva
- Dedicação ao treinamento
- Capacidade de adaptação`,
      author: 'Comentarista Esportivo',
    },
    {
      title: 'Tenista brasileira vence Grand Slam pela primeira vez',
      category: 'Esportes',
      excerpt: 'Jovem atleta conquista título de Grand Slam em competição histórica, marcando virada geracional no tênis mundial.',
      content: `# Tenista Brasileira Vence Grand Slam Pela Primeira Vez

## Vitória Histórica

Uma jovem tenista brasileira venceu seu primeiro título de Grand Slam em uma final memorável, se tornando a primeira brasileira a conquistar tal feito em mais de 20 anos e marcando o início de uma era promissora.

## Jornada para Vitória

A atleta:

- Começou no ranking número 150
- Subiu 100 posições em 12 meses
- Derrotou as 3 melhores tenistas do mundo
- Jogou Final impecável
- Demonstrou mentalidade de campeã

## Performance na Final

Na final memorável:

- Vitória em sets consecutivos
- Apenas 25 erros não forçados
- 65% de primeira bola dentro
- Serviço impecável
- Recepção brilhante

## Significado para o Brasil

A vitória representa:

- Crescimento do tênis brasileiro
- Inspiração para novas gerações
- Reconhecimento internacional
- Aumento de investimentos no esporte
- Possibilidade de mais títulos

## Próximos Desafios

A tenista se prepara para:

- Defender título no próximo ano
- Competir pelas Olimpíadas
- Alcançar número 1 do ranking
- Ganhar mais títulos Grand Slam
- Construir legado duradouro`,
      author: 'Especialista em Tênis',
    },
    {
      title: 'Maratona mundial registra recorde de participação',
      category: 'Esportes',
      excerpt: 'Corrida de resistência atrai 250 mil participantes de 195 países, celebrando espírito olímpico de limite humano.',
      content: `# Maratona Mundial Registra Recorde de Participação

## Evento Gigantesco

A maratona tradicional registrou participação recorde de 250 mil corredores de 195 países, consolidando sua posição como a maior competição de resistência do mundo e maior movimento de pessoas em favor da saúde.

## Números Impressionantes

O evento apresentou:

- 250 mil participantes
- 195 países representados
- 45 bilhões em dinheiro arrecadado para caridade
- Transmissão para 500 milhões de pessoas
- Recorde de velocidade: 2h 01min

## Histórias Inspiradoras

Entre os corredores:

- 500 corredores acima de 80 anos
- Atletas com deficiências completaram prova
- Famílias inteiras correram juntas
- Resgates humanitários através de arrecadação
- Reconstrução de comunidades

## Impacto Social

A maratona serviu para:

- Conscientização sobre saúde global
- Arrecadação para causas sociais
- Integração de comunidades
- Promoção de exercício físico
- Celebração de diversidade

## Próxima Edição

Planejam-se para próxima edição:

- Expansão para 300 mil participantes
- Mais cidades participantes
- Aumento de investimento social
- Melhorias de infraestrutura
- Mais grupos comunitários envolvidos`,
      author: 'Diretor do Evento',
    },
    {
      title: 'Gamer profissional conquista campeonato mundial de e-sports',
      category: 'Esportes',
      excerpt: 'Jovem brasileiro vence The International, o maior campeonato de e-sports do mundo, levando prêmio de $5 milhões.',
      content: `# Gamer Profissional Conquista Campeonato Mundial de E-sports

## Título Merecido

Um jovem gamer brasileiro conquistou o campeonato mundial de e-sports mais prestigiado, vencendo equipes das melhores do mundo e levando seu time ao topo da cena internacional de jogos competitivos.

## Trajetória de Sucesso

O jogador:

- Começou em times pequenas
- Progrediu através do trabalho duro
- Conquistou títulos regionais
- Qualificou-se para mundial
- Venceu monstro da indústria

## Performance no Mundial

Na final epopeia:

- Vitória com placar 3-1
- Partidas magistrais
- MVP do torneio
- Prêmio de $5 milhões
- Reconhecimento histórico

## Importância dos E-sports

A vitória marca:

- Profissionalização dos e-sports
- Reconhecimento global
- Perspectivas de carreira
- Investimentos maiores
- Desenvolvimento no Brasil

## Impacto Futuro

O sucesso pode resultar em:

- Mais jogadores brasileiros em elite global
- Investimentos em infraestrutura
- Suporte do governo para e-sports
- Academias de treinamento
- Transmissões profissionais`,
      author: 'Colunista Gamer',
    },
    {
      title: 'Atleta olímpica iguala recorde de medalhas históricas',
      category: 'Esportes',
      excerpt: 'Natadora lendária conquista sua 28ª medalha olímpica, igualando recorde histórico de atleta imortal do esporte.',
      content: `# Atleta Olímpica Iguala Recorde de Medalhas Históricas

## Realização Monumental

Uma atleta olímpica de renome conquistou sua 28ª medalha olímpica, igualando o recorde histórico de competições olímpicas estabelecido por uma lenda do esporte décadas atrás.

## Carreira Extraordinária

A atleta alcançou:

- 28 medalhas olímpicas (10 ouro, 12 prata, 6 bronze)
- Participação em 7 Olimpíadas
- Records mundiais em múltiplas categorias
- Títulos mundiais internacionais
- Reconhecimento de ícone global

## Gesto Histórico

Na cerimônia de entrega:

- Reconhecimento imediato do feito
- Tributo a recordista anterior
- Abraço entre legenda e recordista
- Momento emocionante para esporte
- Admiração mútua de atletas

## Significado Esportivo

Esta marca representa:

- Excelência duradoura
- Dedicação extrema
- Evolução do desempenho humano
- Inspiração para futuras gerações
- Solidificação de legado

## Legado Duradouro

A atleta deixará:

- Recordes de desempenho
- Lições de perseverança
- Inspiração para jovens
- Padrão de excelência
- Memória inesquecível`,
      author: 'Repórter Olímpico',
    },

    // Cultura (6 posts)
    {
      title: 'Novo filme quebre recordes de bilheteria global',
      category: 'Cultura',
      excerpt: 'Filme brasileiro torna-se primeira produção nacional a ultrapassar $1 bilhão em arrecadação mundial.',
      content: `# Novo Filme Quebra Recordes de Bilheteria Global

## Sucesso Comercial Histórico

Um filme brasileiro alcançou a marca de $1 bilhão em bilheteria global, tornando-se o primeiro filme nacional a atingir tal patamar e trazendo grande visibilidade ao cinema brasileiro internacionalmente.

## Dados de Sucesso

O filme já:

- Arrecadou $1.2 bilhões globalmente
- Foi visto por 150 milhões de pessoas
- Ganhou 12 prêmios internacionais
- Tornou-se fenômeno cultural
- Liderou bilheteria por 8 semanas

## Fatores de Sucesso

O filme conquistou audiência através de:

- História emocionante e universal
- Produção cinematográfica impecável
- Elenco talentoso
- Direção inovadora
- Banda sonora memorável

## Impacto na Indústria

A vitória trouxe:

- Investimento maior no cinema brasileiro
- Reconhecimento internacional
- Inspiração para novos produtores
- Aumento de exportação de cultura
- Perspectiva de mais sucessos

## Próximas Produções

Baseado neste sucesso:

- Estúdios planejam mais blockbusters
- Diretores recebem maiores orçamentos
- Atores brasileiros ganham destaque
- Parcerias internacionais expandem
- Indústria cresce exponencialmente`,
      author: 'Crítico de Cinema',
    },
    {
      title: 'Escritora brasileira vence prêmio literário internacional',
      category: 'Cultura',
      excerpt: 'Autora ganha Prêmio Nobel de Literatura por obra abordando identidade e resistência na literatura brasileira contemporânea.',
      content: `# Escritora Brasileira Vence Prêmio Literário Internacional

## Honra Máxima

Uma escritora brasileira conquistou o Prêmio Nobel de Literatura, o maior reconhecimento na área, marcando apenas a segunda brasileira a receber tal honraria e trazendo atenção global à literatura brasileira.

## Carreira Literária

A autora produziu:

- 15 romances aclamados
- Múltiplos prêmios literários
- Traduções em 50 idiomas
- Influência na literatura mundial
- Reconhecimento crítico universal

## Obra Premiada

O prêmio reconheceu:

- Qualidade literária excepcional
- Abordagem de temas universais
- Estilo inovador e único
- Influência cultural profunda
- Contribuição ao entendimento humano

## Significado Cultural

A vitória representa:

- Ascensão da literatura brasileira
- Reconhecimento de vozes femininas
- Importância da diversidade criativa
- Potencial intelectual do Brasil
- Inspiração para novos escritores

## Impacto Futuro

O prêmio abrirá portas para:

- Maior visibilidade de autores brasileiros
- Investimento em educação literária
- Expansão de mercado de livros
- Mais traduções internacionais
- Influência global crescente`,
      author: 'Crítico Literário',
    },
    {
      title: 'Exposição de arte contemporânea bate recordes de visitação',
      category: 'Cultura',
      excerpt: 'Mostra retrospectiva atrai 5 milhões de visitantes, se tornando a exposição mais visitada da história cultural do país.',
      content: `# Exposição de Arte Contemporânea Bate Recordes de Visitação

## Fenômeno Cultural

Uma exposição de arte contemporânea atraiu 5 milhões de visitantes, quebrando o recorde anterior e consolidando-se como a exposição mais visitada da história cultural brasileira, transformando-a em evento de massa.

## Números Impressionantes

A exposição alcançou:

- 5 milhões de visitantes
- Duração de 6 meses
- 500 obras exibidas
- 50 países representados
- Renda de $200 milhões

## Características da Exposição

A mostra apresentava:

- Arte de mestres clássicos
- Obras contemporâneas inovadoras
- Instalações interativas
- Experiências imersivas
- Reflexão sobre sociedade

## Impacto Social

A exposição resultou em:

- Democratização do acesso à arte
- Educação cultural ampliada
- Comunidades inteiras visitando
- Turismo cultural aumentado
- Apreciação artística expandida

## Legado Cultural

A exposição deixará:

- Novo padrão de exibições
- Inspiração para próximos eventos
- Registro de nossa época
- Documentação de evolução artística
- Memória coletiva duradoura`,
      author: 'Curador de Museu',
    },
    {
      title: 'Banda brasileira se torna a mais tocada no Spotify',
      category: 'Cultura',
      excerpt: 'Grupo musical alcança 5 bilhões de streams, consolidando sua posição como fenômeno global de música brasileira.',
      content: `# Banda Brasileira Se Torna a Mais Tocada no Spotify

## Domínio da Plataforma

Uma banda brasileira alcançou a marca de 5 bilhões de streams no Spotify, se tornando o artista brasileiro mais tocado na plataforma e reforçando a posição de força da música brasileira globalmente.

## Dados de Sucesso

A banda conquistou:

- 5 bilhões de streams totais
- 2 bilhões de ouvintes mensais
- Presença em 150 playlists top
- 80 milhões de seguidores
- Número 1 em 45 países

## Impacto Global

A música da banda alcançou:

- Sucesso em mercados americanos
- Reconhecimento europeu
- Influência em artistas globais
- Inovação musical admirada
- Ponte cultural Brasil-mundo

## Receita e Impacto Econômico

O sucesso gerou:

- Milhões em renda de streaming
- Oportunidades de turnês globais
- Parcerias com marcas
- Investimento em infraestrutura musical
- Empregos para equipe expandida

## Futuro Promissor

O grupo planeja:

- Álbum novo revolucionário
- Turnê mundial expandida
- Colaborações internacionais
- Exploração de novos estilos
- Consolidação como lenda musical`,
      author: 'Crítico Musical',
    },

    // Política (5 posts)
    {
      title: 'Novo governo promete transformações sociais radicais',
      category: 'Política',
      excerpt: 'Administração eleita com grande margem anuncia plano ambicioso para reduzir desigualdade e reformar instituições.',
      content: `# Novo Governo Promete Transformações Sociais Radicais

## Mandato de Mudança

Um novo governo assumiu o poder com grande respaldo eleitoral, comprometendo-se com transformações sociais significativas incluindo reforma de sistemas de educação, saúde e infraestrutura.

## Agenda de Reformas

O governo propõe:

- Reforma educacional universal
- Sistema de saúde pública expandido
- Investimento em infraestrutura
- Redução de desigualdade de renda
- Proteção ambiental fortalecida

## Primeiros 100 Dias

Nos primeiros 100 dias:

- Aprovação de 8 leis importantes
- Implementação de programas emergenciais
- Diálogo com sociedade civil
- Preparação de reformas estruturais
- Criação de conselhos temáticos

## Apoio Popular

O governo mantém:

- Aprovação de 65%
- Confiança institucional em alta
- Apoio de múltiplos setores
- Esperança de mudança
- Entusiasmo com novo rumo

## Desafios a Superar

Mesmo com apoio:

- Resistência política da oposição
- Limitações orçamentárias
- Interesses estabelecidos
- Expectativas altas
- Implementação complexa`,
      author: 'Analista Político',
    },
    {
      title: 'Parlamento aprova lei histórica de proteção ambiental',
      category: 'Política',
      excerpt: 'Legislação ambiciosa estabelece novos padrões globais de proteção da natureza e combate às mudanças climáticas.',
      content: `# Parlamento Aprova Lei Histórica de Proteção Ambiental

## Marcos Legislativos

O Parlamento aprovou uma lei histórica de proteção ambiental que estabelece novos padrões globais de sustentabilidade e coloca o país na vanguarda da proteção climática mundial.

## Disposições Principais

A lei estabelece:

- Meta de neutralidade de carbono em 2050
- Proteção de 80% das florestas nativas
- Investimento de $100 bilhões em energia limpa
- Eliminação de subsídios a combustíveis fósseis
- Educação ambiental obrigatória

## Estrutura de Implementação

A lei cria:

- Ministério de Sustentabilidade
- Fundo ambiental internacional
- Programas de reflorestamento
- Proteção de ecossistemas críticos
- Transição justa para energia limpa

## Apoio Multipartidário

A aprovação reflete:

- Consenso político sobre clima
- Reconhecimento de urgência
- Pressão de sociedade civil
- Compromisso internacional
- Visão de futuro comum

## Impacto Esperado

A implementação pode resultar em:

- Redução de emissões de 70%
- Proteção de milhões de vidas
- Restauração de ecossistemas
- Liderança global climática
- Inovação tecnológica acelerada`,
      author: 'Deputada Ambiental',
    },
    {
      title: 'Tratado internacional une 150 países contra crise hídrica',
      category: 'Política',
      excerpt: 'Acordo histórico estabelece compartilhamento sustentável de recursos hídricos e proteção de aquíferos globais.',
      content: `# Tratado Internacional Une 150 Países Contra Crise Hídrica

## Acordo Sem Precedentes

150 países assinaram um acordo histórico para proteger e compartilhar recursos hídricos de forma sustentável, estabelecendo quadro legal para cooperação em questão crítica para futuro da humanidade.

## Pontos-Chave do Acordo

O tratado estabelece:

- Direito à água potável universal
- Proteção de aquíferos transfronteiriços
- Limite de extração de águas subterrâneas
- Investimento em infraestrutura hídrica
- Monitoramento internacional

## Mecanismos de Execução

O acordo inclui:

- Tribunal internacional de água
- Fundo de $50 bilhões para projetos
- Compartilhamento de tecnologia
- Capacitação de países em desenvolvimento
- Fiscalização contínua

## Impacto Humanitário

O tratado pode:

- Garantir água potável para 2 bilhões de pessoas
- Prevenir conflitos por água
- Proteger ecossistemas aquáticos
- Segurança hídrica para gerações futuras
- Desenvolvimento sustentável

## Implementação

Os países comprometem-se a:

- Ratificar acordo em seus parlamentos
- Começar implementação imediata
- Investir em infraestrutura local
- Compartilhar dados de água
- Cooperar em gerenciamento de bacias`,
      author: 'Diplomata Ambiental',
    },
  ]

  const authors = [
    'Dr. Carlos Oliveira',
    'Marina Santos',
    'Professor Lucas Ferreira',
    'Roberto Alves',
    'Ana Patricia',
    'Felipe Rodrigues',
    'Gamer Pro',
    'Analista Financeiro Sênior',
    'Investidor Tech',
    'Economista-Chefe',
    'Jornalista Econômico',
    'Ministério da Economia',
    'Analista Cripto',
    'Dr. Patricia Mendes',
    'Dr. João Silva',
    'Dra. WHO',
    'Nutricionista Maria',
    'Epidemiologista Sênior',
    'Dr. Mindfulness',
    'Astrônomo-Chefe',
    'Dr. Quantum',
    'Climatologista',
    'Paleontólogo Sênior',
    'Físico de Partículas',
    'Comentarista Esportivo',
    'Especialista em Tênis',
    'Diretor do Evento',
    'Colunista Gamer',
    'Repórter Olímpico',
    'Crítico de Cinema',
    'Crítico Literário',
    'Curador de Museu',
    'Crítico Musical',
    'Analista Político',
    'Deputada Ambiental',
    'Diplomata Ambiental',
  ]

  const comments = [
    'Excelente artigo, muito informativo!',
    'Tive o mesmo problema, obrigado pela solução.',
    'Você poderia elaborar mais sobre este ponto?',
    'Explicação excelente de um tópico complexo.',
    'Isso me ajudou a resolver meu problema.',
    'Espero pelo próximo artigo!',
    'Discordo com essa abordagem.',
    'Você pode fornecer mais exemplos de código?',
    'Exatamente o que eu precisava.',
    'Obrigado por compartilhar seu conhecimento.',
    'Muito bem escrito e fácil de acompanhar.',
    'Tenho uma pergunta sobre a implementação.',
    'Isso mudou minha forma de pensar sobre o tema.',
    'Mais exemplos do mundo real seriam úteis.',
    'Salvei isso como referência futura.',
    'O desempenho melhorou significativamente.',
    'Isso deveria ser leitura obrigatória para desenvolvedores.',
    'Implementei isso e funcionou perfeitamente!',
    'Procurando tópicos mais avançados.',
    'Isso merece mais atenção.',
    'Ótima análise do problema.',
    'Muito claro e bem estruturado.',
    'Isso salvou meu projeto!',
    'Qual é a próxima etapa?',
    'Excelente recurso para aprender.',
    'Funcionou como descrito.',
    'Recomendo para todos que trabalham nisso.',
    'Finalmente encontrei uma explicação clara.',
    'Comunidade adora esse tipo de conteúdo.',
    'Há mais sobre este tópico?',
  ]

  const posts = await Promise.all(
    postsData.map(async (data, index) => {
      const slug = data.title
        .toLowerCase()
        .replace(/\s+/g, '-')
        .replace(/[^\w-]/g, '')

      return prisma.post.create({
        data: {
          title: data.title,
          slug,
          content: data.content,
          excerpt: data.excerpt,
          author: data.author,
          category: data.category,
          published_at: new Date(Date.now() - (index * 24 * 60 * 60 * 1000)),
        },
      })
    })
  )

  for (let i = 0; i < posts.length; i++) {
    const post = posts[i]
    const commentCount = 10

    await Promise.all(
      Array.from({ length: commentCount }).map((_, idx) =>
        prisma.comment.create({
          data: {
            post_id: post.id,
            author_name: authors[Math.floor(Math.random() * authors.length)],
            content: comments[(i * commentCount + idx) % comments.length],
            created_at: new Date(
              post.published_at.getTime() + (idx + 1) * 60 * 60 * 1000
            ),
          },
        })
      )
    )
  }

  const hashedPassword = await bcrypt.hash('admin123', 10)
  await prisma.adminUser.create({
    data: {
      email: 'admin@pulsesnews.com',
      password_hash: hashedPassword,
    },
  })

  console.log('Seeding completed successfully!')
  console.log(`Created ${posts.length} posts with ${posts.length * 10} comments`)
  console.log('Created admin user: admin@pulsesnews.com / admin123')
}

main()
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
