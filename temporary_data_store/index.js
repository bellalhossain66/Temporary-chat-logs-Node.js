var username_list = []
var chat_list = []

module.exports = app => {
    app.get('/', (req, res) => {
        res.render('index.ejs')
    })
    app.post('/store-username', (req, res) => {
        if (req.body.username != '') {
            username_list.push(req.body.username)
            return res.json({
                success: 1,
                username_list: username_list
            })
        } else {
            return res.json({
                success: 0,
                message: 'Fields required'
            })
        }
    })
    app.get('/store-username', (req, res) => {
        return res.json({
            username_list: username_list
        })
    })
    app.post('/search-username', (req, res) => {
        var search = []
        for (var i = 0; i < username_list.length; i++) {
            if (username_list[i].includes(req.body.search)) {
                search.push(username_list[i])
            }
        }
        return res.json({
            username_list: search
        })
    })
    app.get('/store-chat1', (req, res) => {
        return res.json({
            chat_list1: chat_list1
        })
    })
    app.get('/store-chat2', (req, res) => {
        return res.json({
            chat_list2: chat_list2
        })
    })
    app.post('/store-chat', (req, res) => {
        const body = req.body
        if (body.message != '' && body.username != '' && body.time != '' && body.person != '') {
            chat_list.push(body)
            return res.json({
                success: 1,
                chat_list: chat_list
            })
        } else {
            return res.json({
                success: 0,
                message: "Select Account first"
            })
        }
    })
    app.get('/store-chat', (req, res) => {
        return res.json({
            success: 1,
            chat_list: chat_list
        })
    })
}