export const ErrorStatus = {
  Unknown: 0,
  BadRequest: 400,
  Unauthorized: 401,
  Forbidden: 403,
  NotFound: 404
};

export const ErrorCodes = {
  UnknownError: 'UnknownError',
  GenericError: 'GenericError',
  NetworkError: 'NetworkError',
  TimeoutError: 'TimeoutError',
  InvalidGrantError: 'InvalidGrantError'
};

export const ErrorMessages = {
  UnknownError: 'Ocorreu um erro inesperado!\nEntre em contato com o suporte.',
  NetworkError: 'Serviço indisponível no momento!\nTente novamente mais tarde.',
  TimeoutError: 'Tempo limite de operação excedido!\nTente novamente em instantes.',
  InvalidGrantError: 'Falha na autenticação!\nVerifique as credenciais e tente novamente.',
  UnauthorizedError: 'Não autorizado.',
  ForbiddenError: 'Acesso proibido.',
  NotFoundError: 'Não encontrado.'
};
