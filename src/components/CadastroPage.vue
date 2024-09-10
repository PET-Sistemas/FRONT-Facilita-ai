<template>
    <div class="blue-side">
        <div class="container">
            <div class="full-forms">
                <div id="title">Cadastrar</div>
                <div class="name-field">
                    <label for="name">Nome completo</label>
                    <input type="name" id="name"  placeholder=""/>
                </div>
                
                <div class="double-field">
                    <div class="data-field">Data de nascimento
                        <input type="date" name="datanascimento" class="data" id="datanascimento" placeholder="Data de Nascimento" required>
                    </div>
                    <div class="phone-field">
                        <label for="phone">Telefone</label>
                        <input type="phone" class="phone" id="phone"  placeholder=""/>
                    </div>
                </div>
                <div class="double-field">
                    <div class="state-field"> Estado
                        <select id="state" class="state"><option value="">Selecione um estado</option></select>
                    </div>
                    <div class="city-field"> Cidade
                        <select id="city" class="city"><option value="">Selecione uma cidade</option></select>
                    </div>
                </div>

                <div class="email-field">
                    <label for="email">E-mail</label>
                    <input type="email" id="email"  placeholder=""/>
                </div>
                <div class="double-field">
                    <div class="password-field">
                        <label for="password">Senha</label>
                        <input type="password"  id="password" placeholder="">
                    </div>
                    <div class="confirmation">
                        <label for="confirmation">Confirmar senha</label>
                        <input type="confirmation"  id="confirmation" placeholder="">
                    </div>
                </div>
                <div class="form-check form-switch">
                    <input class="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckDefault">
                    <label class="form-check-label" for="flexSwitchCheckDefault">Vender produto</label>
                  </div>
                <center><div class="button-sign">
                        <router-link to="/badge" >
                            <button id="button-sign2">CADASTRAR</button>
                        </router-link>
                </div></center>
                <div class="login_text">
                    Já possui conta?
                    <router-link to="/" class="login_link">
                        Entre
                    </router-link>
                </div>
            </div>
        </div>
    </div>
</template>



<script>

    export default{
        name: "sign_up",
    }

</script>


<style scoped>

.form-check-label{
    margin-top: 1.7rem !important;
    margin-right: 4.5rem !important;
    font-size: 1.3em !important;    
}

.form-check-input{ 
    margin-top: 1.7rem !important;
    margin-left: 3.5rem !important;
    margin-right: 0.5rem !important;
    font-size: 1.3em !important;
    background-color: rgba(206, 206, 206, 1);
}

.form-check-input:checked {
    background-color: rgba(242, 101, 48, 1);
    border-color: white;
}

.form-check-input:focus {
    border-color: white;
    box-shadow: none;
}

.form-check-input:hover {
    border-color: white;
    box-shadow: none;
}

    .container {
        margin-top: 50px;
        margin-bottom: 10px;
        margin-right: 150px;
        margin-left: 150px;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .blue-side {
        position: fixed;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        height: 100vh;
        background: linear-gradient(
        to left bottom,
        #024A59 0%,
        #024A59 0%,
        #024A59 0%,
        #024A59 0%,
        #024A59 0%,
        #024A59 35%,
        #024A59 49%,
        #024A59 54%,
        #067057 86%,
        #068852 100%,
        #348a09 100%,
        #9e940c 100%,
        #F2E206 100%
    ) ;
    }

    .full-forms{
        overflow-y: scroll;
        width: 90%;
        height: 90vh;
        border-radius: 20px;
        box-shadow: 10px 10px 25px 0px rgba(0, 0, 0, 0.5);
        font-family: 'Crete Round';
            background-color: white;
    }
    #title{
        margin-left: 3.5rem;
        margin-top: 2.5rem;
        margin-right:2.5rem;
        margin-bottom: 1rem;
        font-size: 2.3em;
        font-weight: bold;
    }
    .email-field{
        margin-top: 1.3rem;
        margin-left: 3.5rem;
        margin-right: 5.5rem;
        color: #3E3E3E;
        font-size: 1.2em;   
    }

    .double-field{
        width: 100% !important;
        display: flex !important;
    }

    .data-field{
        margin-top: 1.3rem !important; 
        margin-left: 3.5rem !important;
        margin-right: 5.5rem !important;
        color: #3E3E3E !important;
        font-size: 1.3em !important;  
    }

    .state-field{
        margin-top: 1.3rem !important; 
        margin-left: 3.5rem !important;
        margin-right: 5.5rem !important;
        color: #3E3E3E !important;
        font-size: 1.3em !important;   
    }

    .phone-field{
        margin-top: 1.3rem !important; 
        margin-left: 3.5rem !important;
        margin-right: 5.5rem !important;
        color: #3E3E3E !important;
        font-size: 1.3em !important;   
    }

    .city-field{
        margin-top: 1.3rem !important; 
        margin-left: 3.5rem !important;
        margin-right: 5.5rem !important;
        color: #3E3E3E !important;
        font-size: 1.3em !important;    
    }

.phone{
    display: block !important;
    margin-top: 0.5rem !important;
    padding: 0.25rem !important;
    height: 3.5rem !important;
    width: 12.5rem !important;
    border-radius: 10px !important;
    border: 0.1rem solid #C0C0C0 !important;
    box-sizing: border-box !important;
    background-color: #FFF !important;
    font-size: 0.9em !important;
}

.state{
    display: block !important;
    margin-top: 0.5rem !important;
    padding: 0.25rem !important;
    height: 3.5rem !important;
    width: 12.5rem !important;
    border-radius: 10px !important;
    border: 0.1rem solid #C0C0C0 !important;
    box-sizing: border-box !important;
    background-color: #FFF !important;
    font-size: 0.9em !important;
}

.city{
    display: block !important;
    margin-top: 0.5rem !important;
    padding: 0.25rem !important;
    height: 3.5rem !important;
    width: 12.5rem !important;
    border-radius: 10px !important;
    border: 0.1rem solid #C0C0C0 !important;
    box-sizing: border-box !important;
    background-color: #FFF !important;
    font-size: 0.9em !important;
}

.data{
    display: block !important;
    margin-top: 0.5rem !important;
    padding: 0.25rem !important;
    height: 3.5rem !important;
    width: 12.5rem !important;
    border-radius: 10px !important;
    border: 0.1rem solid #C0C0C0 !important;
    box-sizing: border-box !important;
    background-color: #FFF !important;
    font-size: 0.9em !important;
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

.name-field{
    margin-top: 1.3rem;
    margin-left: 3.5rem;
    margin-right: 5.5rem;
    color: #3E3E3E;
    font-size: 1.3em;   
}

#name{
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
    margin-top: 1.3rem;
    margin-left: 3.5rem;
    margin-right: 2rem;
    border-radius: 10px;
    color: #3E3E3E;
    font-size: 1.3em;
}

#password{
    display: block;
    margin-top: 0.4rem;
    padding: 0.25rem;
    width: 24.9rem;
    height: 3.5rem;
    border-radius: 10px;
    border: 0.1rem solid #C0C0C0;
    box-sizing: border-box;
    background-color: #FFF ;
    font-size: 0.9em;
}

.confirmation{
    position: relative;
    margin-top: 1.3rem;
    margin-left: 3.5rem;
    margin-right: 7.5rem;
    border-radius: 10px;
    color: #3E3E3E;
    font-size: 1.3em;
}

#confirmation{
    display: block;
    margin-top: 0.4rem;
    padding: 0.25rem;
    width: 26.9rem;
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

.button-sign{
    margin-left: 3.5rem;
    margin-top: 1.5rem;
    margin-right: 5.5rem;
    border: none;
}

#button-sign2{
    width: 50%;
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

.login_text{
    margin-top: 1rem;
    margin-left: 4.5rem;
    margin-right: 4.5rem;
    margin-bottom: 1rem;
    text-align: center;
    color: #5C5B5B;
    font-family: 'Inter';
}

.login_link{
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