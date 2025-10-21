# Stage 1: build frontend
FROM node:18-alpine AS frontend-build
WORKDIR /app/frontend
COPY ../frontend/package*.json ./
RUN npm ci --silent
COPY ../frontend/ .
RUN npm run build

# Stage 2: build backend
FROM node:18-alpine AS backend-build
WORKDIR /app/backend
COPY package*.json ./
RUN npm ci --silent
COPY . .
# copy built frontend into backend public
COPY --from=frontend-build /app/frontend/dist ./public

# Stage 3: runtime image
FROM node:18-alpine AS runtime
WORKDIR /app
COPY --from=backend-build /app/backend .
ENV NODE_ENV=production
EXPOSE 5000
CMD ["node", "server.js"]
