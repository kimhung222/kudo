export const topic = {
  JOIN_GAME: 'kudo_join_game',
}

export const getMessage = (data: any, topic: any) => {
  return {
    data,
    topic,
  }
}