const apiConfig = {
    baseUrl: 'https://api.themoviedb.org/3/',
    apiKey:'3a238ae3d9092719186721a32d3e3815',
    originImage: (imgPath) => `https://image.tmdb.org/t/p/original/${imgPath}`,
    w500Image: (imgPath) => `https://image.tmdb.org/t/p/w500/${imgPath}`
}

export default apiConfig;