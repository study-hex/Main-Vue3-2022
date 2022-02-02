import { apiLogin } from '/src/scripts/apis.js';
// console.log(apiLogin);
/** end of import */


export default {
    name: "LoginApp",
    /**
     * 【子元件的自訂命名變數】
     * 其中數值會自動接收來自外層的資料
     */
    // props: ['user'],
    props: {
        'user': {
            'username': {
                type: String,
                default: 'Email',
                required: true,
            },
            'password': {
                type: String,
                default: '******',
                required: true,
                // validator: value => value > 0
                validator(value) {
                    return value.length > 5
                }
            },
            /**
             * 【指定資料格式】
             * 注意：這裡無需用引號包成字串，而且首字要大寫
             * [ 用陣列可以同時允許多種型別的資料傳入 ]
             */
            type: [Object],
            // default: '這是子元件的-msg',
        },
        /** end of 'user' */
    },
    /** end of props: */

    data() {
        return {
            hintMsg: 'Welcome!',
        }
        /** end of return */
    },
    /** end of data() */

    methods: {
        goToDesk() {
            window.location = 'desk.html';
        },
        /** end of goToDesk() */

        login() {
            this.hintMsg = '驗證中';
            // post -> token -> cookie -> window
            const user = this.user;
            // alert(user.username)

            // #DEV:
            apiLogin(user)
                .then((response) => {
                    // console.dir(response);
                    const { success, message } = response.data;
                    this.hintMsg = message;
                    if (!success) {
                        return
                        // throw new Error(message);
                    }

                    const { token, expired } = response.data;
                    const MAX_AGE = 30;

                    document.cookie = `W2VUE3=${token}; 
						expires=${new Date(expired)}; 
						max-age=${MAX_AGE}; path=/; 
						SameSite=Lax; Secure; 
					`;

                    localStorage.setItem('hasLog', Date.now())
                    // #DEV:
                    // this.goToDesk()
                })
                .catch((error) => {
                    console.dir(error);
                    // console.log(error.toJSON());
                    const { data } = error.response;
                    this.hintMsg = data.message;
                    user.password = null
                });
        },
        /** end of login() */

        hasLogChecker() {
            if (!localStorage.getItem('hasLog')) {
                return alert('Hi')
            }
            // #DEV:
            // this.goToDesk()
        },
        /** end of hasLogChecker() */
    },
    /** end of methods: */

    // <p>{{ user.username }}</p>
    // <span>{{ user.password }}</span>
    template: `        
        <form class="login-form" id="loginApp"  @submit.prevent="login">            
            <h1  v-show="hintMsg">{{ hintMsg }}</h1>
            
        
            <div class="email">
                <label for="inputEmail"></label>
                <input	id="inputEmail"
                        type="email"
                        name="username"                        
                        v-model.lazy="user.username"
                        v-model.trim="user.username"
                        placeholder="example@test.com"
                        required  autofocus
                />
            </div>

            <div class="password">
				<label for="inputPassword"></label>
				<input  id="inputPassword"
                        type="password"
						name="password"						
						v-model.lazy="user.password"
						v-model.trim="user.password"
						placeholder="******"
						required
				/>
			</div>

            <button type="submit" 
                    class="btn login-btn btn-success">
                Login
            </button>

        </form>
        <!-- end of login-form -->
    `,
    /** end of template */


    created() {
        console.log("created-loginApp");
    },
    mounted() {
        console.log('mounted-loginApp')
        this.hintMsg = 'Hi!'
        this.hasLogChecker()
    },
    /** end of mounted() */
};
/** end of export-default */