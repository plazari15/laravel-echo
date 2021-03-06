
/**
 * First we will load all of this project's JavaScript dependencies which
 * include Vue and Vue Resource. This gives a great starting point for
 * building robust, powerful web applications using Vue and Laravel.
 */

require('./bootstrap');

/**
 * Next, we will create a fresh Vue application instance and attach it to
 * the body of the page. From here, you may begin adding components to
 * the application, or feel free to tweak this setup for your needs.
 */

//Vue.component('example', require('./components/Example.vue'));
const app = new Vue({
    el: '#app',
    delimiters : ['[[', ']]'], //Versão 2.0 do VUE
    data : {
        roomId: roomId,
        roomName : roomName,
        content: '',
        users : [],
        messages : [],
        userId : userId,
    },
    mounted(){ //Versão 2.0 do VUE muda de Ready para Mounted
        Echo.join(`room.${roomId}`)
            .listen('SendMessage', (e) => {
                this.messages.push(e);
            })
            .here((users) => {
                this.users = users;
            })
            .joining((user) => {
                this.users.push(user);
                jQuery.notify(`<strong>${user.name}</strong> entrou na sala <b>${this.roomName}</b>`, {allow_dismiss: true});
            })
            .leaving((user) => {
                this.removeUser(user);
            })
    },
    methods : {
        sendMessage(){
            Vue.http.post(`/chat/salas/${this.roomId}/message`, {
                'content' : this.content
            })
        },
        removeUser: function (user) {
            var index = this.users.indexOf(user);
            this.users.splice(index, 1)
        },
        createPhoto(email){
            return `http://www.gravatar.com/avatar/${md5(email)}.jpg`;
        }
    }
});
