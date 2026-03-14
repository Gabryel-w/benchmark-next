import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  await prisma.comment.deleteMany({})
  await prisma.post.deleteMany({})
  await prisma.adminUser.deleteMany({})

  // Create pool post for comments (hidden from listings)
  const poolPost = await prisma.post.create({
    data: {
      title: 'Comment Pool',
      slug: '__comment-pool__',
      content: '',
      excerpt: '',
      author: 'System',
      category: 'System',
      published_at: new Date(0),
    },
  })

  const commentAuthors = [
    'João Silva', 'Maria Santos', 'Pedro Oliveira', 'Ana Costa',
    'Carlos Ferreira', 'Juliana Souza', 'Rafael Mendes', 'Camila Lima',
    'Lucas Pereira', 'Beatriz Alves', 'Fernando Rocha', 'Patrícia Dias',
    'Gustavo Ribeiro', 'Mariana Carvalho', 'Thiago Nascimento',
    'Larissa Barbosa', 'Bruno Teixeira', 'Isabela Moreira', 'André Duarte',
    'Gabriela Fonseca', 'Diego Martins', 'Renata Campos', 'Marcelo Araújo',
    'Vanessa Correia', 'Ricardo Gomes', 'Fernanda Vieira', 'Leandro Pinto',
    'Aline Cardoso', 'Eduardo Nunes', 'Tatiana Monteiro', 'Rodrigo Castro',
    'Priscila Azevedo', 'Matheus Freitas', 'Daniela Lopes', 'Henrique Machado',
    'Amanda Siqueira', 'Vinícius Borges', 'Natália Rezende', 'Felipe Cunha',
    'Cristiane Ramos',
  ]

  const commentTexts = [
    'Excelente artigo! Muito bem escrito e informativo.',
    'Obrigado por compartilhar, era exatamente o que eu estava procurando.',
    'Muito interessante essa perspectiva. Nunca tinha pensado por esse ângulo.',
    'Discordo em alguns pontos, mas reconheço a qualidade da argumentação.',
    'Artigo fantástico! Compartilhei com toda a minha equipe.',
    'Seria possível aprofundar mais nesse tema em um próximo artigo?',
    'Isso confirma o que eu já suspeitava. Ótima pesquisa!',
    'Parabéns pela análise detalhada. Conteúdo de altíssima qualidade.',
    'Finalmente alguém abordou esse assunto de forma clara e objetiva.',
    'Estou acompanhando essa série de artigos e cada vez fica melhor.',
    'Que reflexão importante! Precisamos debater mais sobre isso.',
    'Li o artigo inteiro e recomendo fortemente a todos.',
    'A parte sobre os dados estatísticos foi muito esclarecedora.',
    'Gostaria de ver mais fontes sobre esse assunto para me aprofundar.',
    'Esse é o tipo de jornalismo que faz falta. Parabéns!',
    'Achei o artigo um pouco superficial, esperava mais detalhes técnicos.',
    'Concordo plenamente com a conclusão apresentada pelo autor.',
    'Informação valiosa que deveria ser mais divulgada na mídia.',
    'Muito bom! Vou usar como referência no meu trabalho acadêmico.',
    'A análise está impecável. O autor domina muito bem o assunto.',
    'Que bom ver esse tema sendo discutido de forma séria e responsável.',
    'Artigo esclarecedor! Tirou várias dúvidas que eu tinha sobre o tema.',
    'Precisamos de mais conteúdos assim, com profundidade e embasamento.',
    'Salvei nos favoritos para ler novamente com mais calma depois.',
    'A introdução me prendeu e o desenvolvimento não decepcionou.',
    'Texto muito bem estruturado. Dá gosto de ler do início ao fim.',
    'Tenho uma opinião diferente, mas respeito o ponto de vista do autor.',
    'Esse tipo de matéria é o que mantém a credibilidade do jornalismo.',
    'Gostei especialmente da parte que fala sobre as consequências futuras.',
    'Material de primeira qualidade. Já estou aguardando o próximo.',
    'O contexto histórico apresentado enriqueceu muito a análise.',
    'Seria interessante trazer entrevistas com especialistas na área.',
    'Achei o título chamativo e o conteúdo correspondeu às expectativas.',
    'Faltou abordar o impacto social desse fenômeno, mas no geral está ótimo.',
    'Reportagem corajosa e necessária. Parabéns à equipe editorial.',
    'Já compartilhei nas redes sociais. Mais pessoas precisam ler isso.',
    'O infográfico que acompanha o texto facilita muito a compreensão.',
    'Artigo denso mas acessível. Equilibrou bem profundidade e clareza.',
    'Essa é uma das melhores análises que já li sobre o assunto.',
    'Fiquei impressionado com a quantidade de dados apresentados.',
    'Tema muito relevante para o momento atual que vivemos no país.',
    'A conclusão do artigo me fez repensar algumas posições que eu tinha.',
    'Conteúdo de qualidade como esse deveria ter mais visibilidade.',
    'Muito didático! Consegui entender um tema que antes me parecia complexo.',
    'O autor tem uma capacidade incrível de simplificar assuntos difíceis.',
    'Acompanho esse portal há anos e a qualidade só melhora.',
    'Esse assunto merece uma série completa de reportagens investigativas.',
    'Boa leitura para quem quer se manter informado sobre o tema.',
    'A objetividade do texto é admirável. Sem sensacionalismo.',
    'Gostaria que esse tipo de conteúdo fosse mais acessível ao público geral.',
  ]

  // Create 500 comments attached to pool post
  const commentsData = []
  for (let i = 0; i < 500; i++) {
    commentsData.push({
      post_id: poolPost.id,
      author_name: commentAuthors[i % commentAuthors.length],
      content: commentTexts[i % commentTexts.length],
      created_at: new Date(Date.now() - Math.floor(Math.random() * 30 * 24 * 60 * 60 * 1000)),
    })
  }

  // Insert in batches for performance
  for (let i = 0; i < commentsData.length; i += 50) {
    const batch = commentsData.slice(i, i + 50)
    await Promise.all(batch.map(data => prisma.comment.create({ data })))
  }

  // Create admin user
  const hashedPassword = await bcrypt.hash('admin123', 10)
  await prisma.adminUser.create({
    data: {
      email: 'admin@devblog.com',
      password_hash: hashedPassword,
    },
  })

  console.log('Seeding completed successfully!')
  console.log(`Created pool post with 500 comments`)
  console.log('Created admin user: admin@devblog.com / admin123')
}

main()
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
