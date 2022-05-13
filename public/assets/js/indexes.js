function username_list() {
    $.ajax({
        method: 'get',
        url: '/store-username',
        dataType: 'json',
        success: function(data) {
            var html = ''
            for (var i = 0; i < data.username_list.length; i++) {
                html += '<a href="#" class="list-group-item list-group-item-action border-0" id="' + i + '">'
                html += '<div class="d-flex align-items-start"> <img src="./assets/img/avatar.png" class="rounded-circle mr-1" width="40" height="40">'
                html += '    <div class="flex-grow-1 ml-3"> ' + data.username_list[i]
                html += '        <div class="small"><i class="fas fa-circle chat-online"></i> Online</div>'
                html += '    </div>'
                html += '</div>'
                html += '</a>'
                html += '<div class="w-75 ml-4 mt-2 bg-dark person-select person-select' + i + '">'
                html += '<div class="border-bottom">'
                html += '    <span class="ml-4 text-white for-1st-person" name="' + data.username_list[i] + '">For 1st person</span>'
                html += '</div>'
                html += '<div class="ml-4">'
                html += '    <span class="text-white for-2nd-person" name="' + data.username_list[i] + '">For 2nd person</span>'
                html += '</div>'
                html += '</div>'
            }
            $('.user-list').html(html)
        }
    })
}

function fetch_chat() {
    $.ajax({
        method: 'get',
        url: '/store-chat',
        dataType: 'json',
        success: function(data) {
            if (data.success == 1) {
                var html = ''
                var html2 = ''
                for (var i = 0; i < data.chat_list.length; i++) {
                    if (data.chat_list[i].person == '1st') {
                        $('#1st-person').text(data.chat_list[i].username)
                        html += '<div class="chat-message-right pb-4">'
                        html += '<div> <img src="./assets/img/avatar.png" class="rounded-circle mr-1" alt="Chris Wood" width="40" height="40">'
                        html += '    <div class="text-muted small text-nowrap mt-2">' + data.chat_list[i].time + '</div>'
                        html += '</div>'
                        html += '<div class="flex-shrink-1 bg-light rounded py-2 px-3 mr-3">'
                        html += '    <div class="font-weight-bold mb-1">You</div>' + data.chat_list[i].message + '</div>'
                        html += '</div>'

                        html2 += '<div class="chat-message-left pb-4">'
                        html2 += '<div> <img src="./assets/img/avatar.png" class="rounded-circle mr-1" alt="Chris Wood" width="40" height="40">'
                        html2 += '    <div class="text-muted small text-nowrap mt-2">' + data.chat_list[i].time + '</div>'
                        html2 += '</div>'
                        html2 += '<div class="flex-shrink-1 bg-light rounded py-2 px-3 mr-3">'
                        html2 += '    <div class="font-weight-bold mb-1">' + data.chat_list[i].username + '</div>' + data.chat_list[i].message + '</div>'
                        html2 += '</div>'
                    } else {
                        $('#2nd-person').text(data.chat_list[i].username)
                        html += '<div class="chat-message-left pb-4">'
                        html += '<div> <img src="./assets/img/avatar.png" class="rounded-circle mr-1" alt="Chris Wood" width="40" height="40">'
                        html += '    <div class="text-muted small text-nowrap mt-2">' + data.chat_list[i].time + '</div>'
                        html += '</div>'
                        html += '<div class="flex-shrink-1 bg-light rounded py-2 px-3 mr-3">'
                        html += '    <div class="font-weight-bold mb-1">' + data.chat_list[i].username + '</div> ' + data.chat_list[i].message + '</div>'
                        html += '</div>'

                        html2 += '<div class="chat-message-right pb-4">'
                        html2 += '<div> <img src="./assets/img/avatar.png" class="rounded-circle mr-1" alt="Chris Wood" width="40" height="40">'
                        html2 += '    <div class="text-muted small text-nowrap mt-2">' + data.chat_list[i].time + '</div>'
                        html2 += '</div>'
                        html2 += '<div class="flex-shrink-1 bg-light rounded py-2 px-3 mr-3">'
                        html2 += '    <div class="font-weight-bold mb-1">You</div> ' + data.chat_list[i].message + '</div>'
                        html2 += '</div>'
                    }
                }
                $('.chat-box-1st').html(html)
                $('.chat-box-2nd').html(html2)
            } else {
                alert(data.message)
            }
        }
    })
}
username_list()
fetch_chat()

$(document).on('click', '.list-group-item-action', function(event) {
    event.preventDefault()
    $('.person-select').slideUp()
    $('.person-select' + $(this).attr('id')).slideToggle()
})
$('body').on('click', function(event) {
    event.preventDefault()
    $('.person-select').slideUp()
})
$(document).on('click', '.registration', function(data) {
    var username = $('.user-name').val()
    $('.user-name').val('')
    $('.name-notice').hide()
    $.ajax({
        method: 'post',
        url: '/store-username',
        dataType: 'json',
        data: {
            username: username
        },
        success: function(data) {
            if (data.success == 1) {
                var html = ''
                for (var i = 0; i < data.username_list.length; i++) {
                    html += '<a href="#" class="list-group-item list-group-item-action border-0" id="' + i + '">'
                    html += '<div class="d-flex align-items-start"> <img src="./assets/img/avatar.png" class="rounded-circle mr-1" width="40" height="40">'
                    html += '    <div class="flex-grow-1 ml-3"> ' + data.username_list[i]
                    html += '        <div class="small"><i class="fas fa-circle chat-online"></i> Online</div>'
                    html += '    </div>'
                    html += '</div>'
                    html += '</a>'
                    html += '<div class="w-75 ml-4 mt-2 bg-dark person-select person-select' + i + '">'
                    html += '<div class="border-bottom">'
                    html += '    <span class="ml-4 text-white for-1st-person" name="' + data.username_list[i] + '">For 1st person</span>'
                    html += '</div>'
                    html += '<div class="ml-4">'
                    html += '    <span class="text-white for-2nd-person" name="' + data.username_list[i] + '">For 2nd person</span>'
                    html += '</div>'
                    html += '</div>'
                }
                $('.user-list').html(html)
            } else {
                $('.name-notice').show()
            }
        }
    })
})
$('.search-person').keyup(function() {
    $.ajax({
        method: 'post',
        url: '/search-username',
        dataType: 'json',
        data: {
            search: $(this).val()
        },
        success: function(data) {
            var html = ''
            for (var i = 0; i < data.username_list.length; i++) {
                html += '<a href="#" class="list-group-item list-group-item-action border-0" id="' + i + '">'
                html += '<div class="d-flex align-items-start"> <img src="./assets/img/avatar.png" class="rounded-circle mr-1" width="40" height="40">'
                html += '    <div class="flex-grow-1 ml-3"> ' + data.username_list[i]
                html += '        <div class="small"><i class="fas fa-circle chat-online"></i> Online</div>'
                html += '    </div>'
                html += '</div>'
                html += '</a>'
                html += '<div class="w-75 ml-4 mt-2 bg-dark person-select person-select' + i + '">'
                html += '<div class="border-bottom">'
                html += '    <span class="ml-4 text-white for-1st-person" name="' + data.username_list[i] + '">For 1st person</span>'
                html += '</div>'
                html += '<div class="ml-4">'
                html += '    <span class="text-white for-2nd-person" name="' + data.username_list[i] + '">For 2nd person</span>'
                html += '</div>'
                html += '</div>'
            }
            $('.user-list').html(html)
        }
    })
})
$(document).on('click', '.for-1st-person', function() {
    $('#1st-person').text($(this).attr('name'))
})
$(document).on('click', '.for-2nd-person', function() {
    $('#2nd-person').text($(this).attr('name'))
})
$('.1st-type-box').keyup(function() {
    if ($(this).val().length > 0) {
        $('.type-notice2').show()
    } else {
        $('.type-notice2').hide()
    }
})
$('.2nd-type-box').keyup(function() {
    if ($(this).val().length > 0) {
        $('.type-notice1').show()
    } else {
        $('.type-notice1').hide()
    }
})
$(document).on('click', '.send-msg-1st-btn', function() {
    $('.type-notice2').hide()
    var message = $('.1st-type-box').val()
    var username = $('#1st-person').text()
    var today = new Date()
    var time = (today.getHours() ? today.getHours() : 12) + ':' + today.getMinutes() + ' ' + (today.getHours() >= 12 ? 'pm' : 'am')
    $('.1st-type-box').val('')
    $.ajax({
        method: 'post',
        url: '/store-chat',
        dataType: 'json',
        data: {
            username: username,
            message: message,
            time: time,
            person: '1st'
        },
        success: function(data) {
            if (data.success == 1) {
                var html = ''
                var html2 = ''
                for (var i = 0; i < data.chat_list.length; i++) {
                    if (data.chat_list[i].person == '1st') {
                        html += '<div class="chat-message-right pb-4">'
                        html += '<div> <img src="./assets/img/avatar.png" class="rounded-circle mr-1" alt="Chris Wood" width="40" height="40">'
                        html += '    <div class="text-muted small text-nowrap mt-2">' + data.chat_list[i].time + '</div>'
                        html += '</div>'
                        html += '<div class="flex-shrink-1 bg-light rounded py-2 px-3 mr-3">'
                        html += '    <div class="font-weight-bold mb-1">You</div>' + data.chat_list[i].message + '</div>'
                        html += '</div>'

                        html2 += '<div class="chat-message-left pb-4">'
                        html2 += '<div> <img src="./assets/img/avatar.png" class="rounded-circle mr-1" alt="Chris Wood" width="40" height="40">'
                        html2 += '    <div class="text-muted small text-nowrap mt-2">' + data.chat_list[i].time + '</div>'
                        html2 += '</div>'
                        html2 += '<div class="flex-shrink-1 bg-light rounded py-2 px-3 mr-3">'
                        html2 += '    <div class="font-weight-bold mb-1">' + data.chat_list[i].username + '</div>' + data.chat_list[i].message + '</div>'
                        html2 += '</div>'
                    } else {
                        html += '<div class="chat-message-left pb-4">'
                        html += '<div> <img src="./assets/img/avatar.png" class="rounded-circle mr-1" alt="Chris Wood" width="40" height="40">'
                        html += '    <div class="text-muted small text-nowrap mt-2">' + data.chat_list[i].time + '</div>'
                        html += '</div>'
                        html += '<div class="flex-shrink-1 bg-light rounded py-2 px-3 mr-3">'
                        html += '    <div class="font-weight-bold mb-1">' + data.chat_list[i].username + '</div> ' + data.chat_list[i].message + '</div>'
                        html += '</div>'

                        html2 += '<div class="chat-message-right pb-4">'
                        html2 += '<div> <img src="./assets/img/avatar.png" class="rounded-circle mr-1" alt="Chris Wood" width="40" height="40">'
                        html2 += '    <div class="text-muted small text-nowrap mt-2">' + data.chat_list[i].time + '</div>'
                        html2 += '</div>'
                        html2 += '<div class="flex-shrink-1 bg-light rounded py-2 px-3 mr-3">'
                        html2 += '    <div class="font-weight-bold mb-1">You</div> ' + data.chat_list[i].message + '</div>'
                        html2 += '</div>'
                    }
                }
                $('.chat-box-1st').html(html)
                $('.chat-box-2nd').html(html2)
            } else {
                alert(data.message)
            }
        }
    })
})
$(document).on('click', '.send-msg-2nd-btn', function() {
    $('.type-notice1').hide()
    var message = $('.2nd-type-box').val()
    $('.2nd-type-box').val('')
    var username = $('#2nd-person').text()
    var today = new Date()
    var time = (today.getHours() ? today.getHours() : 12) + ':' + today.getMinutes() + ' ' + (today.getHours() >= 12 ? 'pm' : 'am')
    $.ajax({
        method: 'post',
        url: '/store-chat',
        dataType: 'json',
        data: {
            username: username,
            message: message,
            time: time,
            person: '2nd'
        },
        success: function(data) {
            if (data.success == 1) {
                var html = ''
                var html2 = ''
                for (var i = 0; i < data.chat_list.length; i++) {
                    if (data.chat_list[i].person == '1st') {
                        html += '<div class="chat-message-right pb-4">'
                        html += '<div> <img src="./assets/img/avatar.png" class="rounded-circle mr-1" alt="Chris Wood" width="40" height="40">'
                        html += '    <div class="text-muted small text-nowrap mt-2">' + data.chat_list[i].time + '</div>'
                        html += '</div>'
                        html += '<div class="flex-shrink-1 bg-light rounded py-2 px-3 mr-3">'
                        html += '    <div class="font-weight-bold mb-1">You</div>' + data.chat_list[i].message + '</div>'
                        html += '</div>'

                        html2 += '<div class="chat-message-left pb-4">'
                        html2 += '<div> <img src="./assets/img/avatar.png" class="rounded-circle mr-1" alt="Chris Wood" width="40" height="40">'
                        html2 += '    <div class="text-muted small text-nowrap mt-2">' + data.chat_list[i].time + '</div>'
                        html2 += '</div>'
                        html2 += '<div class="flex-shrink-1 bg-light rounded py-2 px-3 mr-3">'
                        html2 += '    <div class="font-weight-bold mb-1">' + data.chat_list[i].username + '</div>' + data.chat_list[i].message + '</div>'
                        html2 += '</div>'
                    } else {
                        html += '<div class="chat-message-left pb-4">'
                        html += '<div> <img src="./assets/img/avatar.png" class="rounded-circle mr-1" alt="Chris Wood" width="40" height="40">'
                        html += '    <div class="text-muted small text-nowrap mt-2">' + data.chat_list[i].time + '</div>'
                        html += '</div>'
                        html += '<div class="flex-shrink-1 bg-light rounded py-2 px-3 mr-3">'
                        html += '    <div class="font-weight-bold mb-1">' + data.chat_list[i].username + '</div> ' + data.chat_list[i].message + '</div>'
                        html += '</div>'

                        html2 += '<div class="chat-message-right pb-4">'
                        html2 += '<div> <img src="./assets/img/avatar.png" class="rounded-circle mr-1" alt="Chris Wood" width="40" height="40">'
                        html2 += '    <div class="text-muted small text-nowrap mt-2">' + data.chat_list[i].time + '</div>'
                        html2 += '</div>'
                        html2 += '<div class="flex-shrink-1 bg-light rounded py-2 px-3 mr-3">'
                        html2 += '    <div class="font-weight-bold mb-1">You</div> ' + data.chat_list[i].message + '</div>'
                        html2 += '</div>'
                    }
                }
                $('.chat-box-1st').html(html)
                $('.chat-box-2nd').html(html2)
            } else {
                alert(data.message)
            }
        }
    })
})