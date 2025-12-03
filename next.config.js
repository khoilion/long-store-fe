/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 's3.ducbinh203.tech',
                port: '',
                pathname: '/**',
            },
        ],
    },
}

module.exports = nextConfig