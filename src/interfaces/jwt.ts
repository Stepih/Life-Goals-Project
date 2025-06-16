// Минимальный payload для генерации токенов
export interface IJwtSignPayload {
  userId: string;
  email: string;
}

// Payload после верификации — с iat и exp
export interface IJwtPayload extends IJwtSignPayload {
  iat: number;
  exp: number;
}
