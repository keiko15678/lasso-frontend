<template>
  <div class="login">
    <h1 class="login__title">
      <div class="login__logo"></div>
      <div class="login__words">Login</div>
    </h1>
    <div class="login__body">
      <div class="inputWrapper">
        <div class="inputWrapper__row">
          <div class="input">
            <div class="input__label">公司代碼</div>
            <div class="input__input">
              <input type="text" v-model="inputData.CompanyCode" class="input__inputBox"/>
            </div>
          </div>    
        </div>
        <div class="inputWrapper__row">
          <div class="input">
            <div class="input__label">帳號</div>
            <div class="input__input">
              <input type="text" required v-model="inputData.Email" class="input__inputBox"/>
            </div>
          </div>
        </div>
        <div class="inputWrapper__row">
          <div class="input">
            <div class="input__label">密碼</div>
            <div class="input__input">
              <input type="text" required v-model="inputData.Password" class="input__inputBox"/>
            </div>
          </div>
        </div>
        <div class="inputWrapper__row" style="margin-bottom:8px; min-height:20px;">
          <div class="input" style="font-size:14px;color:#aaa;">
            {{ error || '' }}
          </div>
        </div>
        <div class="inputWrapper__row">
          <div class="input">
            <button @click="handleLogin" class="btn btn--lasso" :class="{ 'button--disabled': inputData.Email === '' || inputData.Password === '' }">登入</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'nuxt-property-decorator'
import { $auth } from '~/utils/api'
import Token from '~/utils/token'
import { LoginInfo } from '~/types/index'

@Component({
  layout: 'backendLogin'
})
export default class Login extends Vue {
  private inputData: LoginInfo = {
    Email: '',
    Password: '',
    CompanyCode: 'MAYO'
  }

  private error: string = ''

  private async handleLogin(): Promise<void> {
    try {
      const result = await this.sendGetTokenRequest()
      if(result && result.data && result.data.access_token) {
        const token: string = result.data.access_token
        Token.setToken(token)
        this.$router.push('/sys/')
      } else {
        throw new Error('登入信息錯誤')
      }
    } catch(e) {
      if(e.message === 'Request failed with status code 401' || e.message === '登入信息錯誤') {
        this.error = '登入信息錯誤'
      } else {
        this.error = '伺服器錯誤'
      }
      
    }
  }

  private async sendGetTokenRequest(): Promise<any> {
    const { Email, Password, CompanyCode } = this.inputData
    const requestBody = `CompanyCode=${CompanyCode}&Email=${Email}&Password=${Password}&grant_type=password`
    const result = await $auth.post(
      '/Token',
      requestBody
    )
    return result
  }
}
</script>

<style lang="scss" scoped>
@import '../../assets/scss/utils/_variables.scss';

.login {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 30vw;
  border: 2px solid $primary;
  border-radius: 4px;
  -webkit-box-shadow: 10px 15px 12px -7px rgba($color: $primary, $alpha: .3);
  -moz-box-shadow: 10px 15px 12px -7px rgba($color: $primary, $alpha: .3);
  box-shadow: 10px 15px 12px -7px rgba($color: $primary, $alpha: .3);
  transform: translate(-50%, -50%);
  padding: 16px 24px;
  @media only screen and (max-width: 1023px) {
    width: 80vw;
  }
  @media only screen and (max-width: 1366px) {
    width: 60vw;
  }
  &__title {
    display: flex;
    align-items: center;   
    color: $primary;
  }
  &__logo {
    width: 82px;
    height: 20px;
    background-position: center center;
    background-size: contain;
    background-repeat: no-repeat;
    background-image: url(/logo_lasso_word@3x.png);
  }
  &__words {
    font-size: 20px;
    margin-left: auto;
    letter-spacing: 3px;
    font-weight: 300;
  }
  &__body {
    margin-top: 24px;
  }
}

</style>