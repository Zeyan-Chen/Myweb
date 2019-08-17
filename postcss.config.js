module.exports = {
    plugins: [
        require('autoprefixer')({
            browsers: [
                // ... for 你的專案要支援到幾版
                '> 1%',
                'last 5 versions',
                'Firefox >= 45',
                'IOS >= 8',
                'Safari >= 8',
                'ie >= 10'
            ]
        })
    ]
};
