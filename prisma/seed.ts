import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  await prisma.comment.deleteMany({})
  await prisma.post.deleteMany({})
  await prisma.adminUser.deleteMany({})

  const postTitles = [
    'Getting Started with Next.js 14',
    'Understanding React Server Components',
    'Optimizing Performance in Modern Web Apps',
    'TypeScript Best Practices',
    'Database Design Patterns',
    'API Route Security',
    'Building Scalable Applications',
    'Frontend Testing Strategies',
    'Deployment Best Practices',
    'Caching Strategies for APIs',
    'Understanding Middleware',
    'State Management Patterns',
    'Building Real-time Applications',
    'Authentication and Authorization',
    'Error Handling in APIs',
    'Database Optimization',
    'Code Organization',
    'Component Design Principles',
    'Performance Monitoring',
    'Security Best Practices',
    'Accessibility Guidelines',
    'SEO for Single Page Apps',
    'Progressive Enhancement',
    'Web Performance Metrics',
    'Building CLI Tools',
    'Container Orchestration',
    'Infrastructure as Code',
    'CI/CD Pipelines',
    'Monitoring and Logging',
    'Event-Driven Architecture',
    'Microservices Design',
    'API Rate Limiting',
    'Concurrent Processing',
    'Memory Management',
    'Stream Processing',
    'Building Plugins',
    'Custom Hooks in React',
    'Context API Deep Dive',
    'Suspense and Concurrent Rendering',
    'Next.js Image Optimization',
    'Font Loading Strategies',
    'CSS-in-JS Solutions',
    'Headless CMS Integration',
    'GraphQL Fundamentals',
    'REST API Design',
    'Version Control Workflows',
    'Code Review Best Practices',
    'Technical Documentation',
    'Team Collaboration Tools',
    'Machine Learning Integration',
  ]

  const authors = [
    'Alice Johnson',
    'Bob Smith',
    'Carol Williams',
    'David Brown',
    'Eve Davis',
  ]

  const comments = [
    'Great article, very informative!',
    'I had the same issue, thanks for the solution.',
    'Could you elaborate more on this point?',
    'Excellent explanation of a complex topic.',
    'This helped me solve my problem.',
    'Looking forward to the next post!',
    'I disagree with this approach.',
    'Can you provide more code examples?',
    'This is exactly what I needed.',
    'Thank you for sharing your expertise.',
    'Well written and easy to follow.',
    'I have a question about the implementation.',
    'This changed how I think about this topic.',
    'More real-world examples would be helpful.',
    'Bookmarking this for later reference.',
    'The performance improvements are impressive.',
    'This should be required reading for developers.',
    'I implemented this and it works great!',
    'Looking for more advanced topics.',
    'This deserves more attention.',
  ]

  const posts = await Promise.all(
    postTitles.map(async (title, index) => {
      const slug = title
        .toLowerCase()
        .replace(/\s+/g, '-')
        .replace(/[^\w-]/g, '')

      const content = `# ${title}

## Introduction

This comprehensive guide covers the essential aspects of ${title.toLowerCase()}. Whether you're a beginner or an experienced developer, you'll find valuable insights and practical examples.

## Key Concepts

Understanding the fundamentals is crucial for mastery. Let's explore the core principles:

1. **First Principle**: The foundation of everything we discuss here.
2. **Second Principle**: Building upon the basics to create robust solutions.
3. **Third Principle**: Advanced techniques for optimization and best practices.

## Implementation Details

Here's how you can implement these concepts in your projects:

\`\`\`typescript
// Example code snippet
const example = async (data: string) => {
  const processed = data.toUpperCase()
  return {
    success: true,
    data: processed,
    timestamp: new Date().toISOString()
  }
}
\`\`\`

## Best Practices

Following these practices will ensure your code is maintainable and efficient:

- Always validate input data
- Use proper error handling
- Write descriptive variable names
- Test your code thoroughly
- Document your functions

## Common Pitfalls

Avoid these common mistakes:

1. Not handling edge cases
2. Ignoring performance implications
3. Poor error messages
4. Lack of type safety
5. Insufficient testing

## Conclusion

We've covered the essential aspects of ${title.toLowerCase()}. Remember to practice these concepts regularly and keep learning. The field evolves constantly, and staying updated is key to success.

## Further Reading

Check out these resources for more information and advanced topics related to this subject matter.`

      return prisma.post.create({
        data: {
          title,
          slug,
          content,
          excerpt: `Learn about ${title.toLowerCase()} and its practical applications in modern development.`,
          author: authors[index % authors.length],
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
            author_name: `User ${Math.floor(Math.random() * 100) + 1}`,
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
      email: 'admin@devblog.com',
      password_hash: hashedPassword,
    },
  })

  console.log('Seeding completed successfully!')
  console.log(`Created ${posts.length} posts with ${posts.length * 10} comments`)
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
