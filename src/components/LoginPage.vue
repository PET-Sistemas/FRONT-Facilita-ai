<script setup>
    import { RouterLink } from "vue-router";
</script>

<template>
    <div class="full-forms">
        <div id="title">Entrar</div>
        <div class="email-field">
            <label for="email">Email</label>
            <input type="email" id="email"  placeholder=""/>
        </div>
        <div class="password-field">
            <label for="password">Senha</label>
            <RouterLink to="/recover">
                <a id="forgot-password" href="/">Esqueci a senha</a>
            </RouterLink>
            <input type="password"  id="password" placeholder="">
        </div>
        <div class="button-login">
                <RouterLink to="/badge" >
                    <button id="button-login2">ENTRAR</button>
                </RouterLink>
        </div>
        <div class="signup_text">
            Não possui uma conta?
            <RouterLink to="sign_up" class="signup_link">
                Cadastre-se
                </RouterLink>
        </div>
    </div>
</template>


<style scoped>

.full-forms{
    width: 60%;
    height: 75vh;
    margin: auto;
    margin-right: 3%;
    border-radius: 20px;
    box-shadow: 10px 10px 25px 0px rgba(0, 0, 0, 0.5);
    font-family: 'Crete Round';
		background-color: white;
}
#title{
    margin-left: 2.5rem;
    margin-top: 3.5rem;
    margin-right:2.5rem;
    margin-bottom: 1rem;
    font-size: 2.3em;
}
.email-field{
    margin-top: 2rem;
    margin-left: 2.5rem;
    margin-right: 2.5rem;
    color: #3E3E3E;
    font-size: 1.3em;
    
    
}

#email{
    display: block;
    margin-top: 0.5rem;
    padding: 0.25rem;
    height: 3.5rem;
    width: 100%;
    border-radius: 10px;
    border: 0.1rem solid #C0C0C0;
    box-sizing: border-box;
    background-color: #FFF ;
    font-size: 0.9em;
}

.password-field{
    position: relative;
    margin-top: 1.7rem;
    margin-left: 2.5rem;
    margin-right: 2.5rem;
    border-radius: 10px;
    color: #3E3E3E;
    font-size: 1.3em;
}

#password{
    display: block;
    margin-top: 0.4rem;
    padding: 0.25rem;
    width: 100%;
    height: 3.5rem;
    border-radius: 10px;
    border: 0.1rem solid #C0C0C0;
    box-sizing: border-box;
    background-color: #FFF ;
    font-size: 0.9em;
}

a{
    text-decoration: none;
    color: #1570EF;
    margin-top: 5.7rem;
    font-family: 'Inter';
    

}

a:visited{
    color: #1570EF;
    
}

.button-login{
    margin-left: 2.5rem;
    margin-top: 1.5rem;
    margin-right: 2.5rem;
    border: none;
}

#button-login2{
    width: 100%;
    margin-top: 1.7rem;
    padding: 0.25rem;
    background-color: #F26530;
    height: 3.2rem;
    border-radius: 7px;
    color: #FFF;
    font-weight: bold;
    font-size: 1.5em;
    cursor:pointer;
    border: none;
    
}

.signup_text{
    margin-top: 0.3rem;
    margin-left: 4.5rem;
    margin-right: 4.5rem;
    text-align: center;
    color: #5C5B5B;
    font-family: 'Inter';
}

.signup_link{
    color:#1570EF;
}

#forgot-password{
    position: absolute;
    color: #1570EF;
    text-decoration: none;
    right: 0;
    font-family: 'Inter';
    font-size: 1rem;
}

@media screen and (min-width: 1024px) and (max-width: 1440px){
    .full-forms{
        position: absolute;
        top: 30%;
        left: 20%;
        width: 60%;
        height: 35hv;
    }
}
@media screen and (min-width: 600px) and (max-width: 1000px){
    .full-forms{
        position: absolute;
        top: 25%;
        left: 20%;
        width: 60%;
        height: 50hv;
    }
}

@media screen and (max-width: 500px){
    .full-forms{
        position: absolute;
        z-index: 100;
        top: 30%;
        width: 100%;
        height: 70hv;
        border-radius: 10px 10px 0 0;
    }
}
</style>