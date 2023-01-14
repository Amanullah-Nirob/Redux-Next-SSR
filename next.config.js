module.exports = {
  images: {
    domains: ["localhost", "dpclinic.ru", "protara.ru"]
  },
  async redirects() {
    return [
      {
        source: '/',
        destination: '/tracks',
        permanent: true,
      },
    ]
  },
}