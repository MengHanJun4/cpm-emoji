FROM node:20-alpine AS base

# Install dependencies only when needed
FROM base AS deps
RUN apk add --no-cache libc6-compat

# Set npm registry to npmmirror for faster downloads
RUN npm config set registry https://registry.npmmirror.com/

WORKDIR /app

# Copy package files
COPY package.json package-lock.json source.config.ts ./

# Install dependencies using npm
RUN npm ci --only=production --no-audit --no-fund

# Rebuild the source code only when needed
FROM deps AS builder

WORKDIR /app

# Copy all files
COPY . .

# Install all dependencies (including devDependencies) for build
RUN npm ci --no-audit --no-fund

# Build the application
RUN npm run build

# Production image, copy all the files and run next
FROM base AS runner
WORKDIR /app

RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nextjs && \
    mkdir .next && \
    chown nextjs:nodejs .next

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV NODE_ENV production

ENV PORT 3000
ENV HOSTNAME "0.0.0.0"

# server.js is created by next build from the standalone output
CMD ["node", "server.js"]