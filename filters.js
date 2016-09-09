//criar filtro para nao mostrar numeros no done (pago nao pago) (existem filtros predefinidos, pode ser visto na documentação do vue)
Vue.filter('doneLabel', function(value){
    if(value == 1){
        return "Paga";
    }else{
        return "Não paga";
    }   
});

Vue.filter('verifyPayments', function(value){
    
        if(value === false){
            return 'Nenhuma conta registada';
        }
        
        if(!value){
            return "Não existe nenhum pagamento pendente";
        }else{
            return "Existem "+value+" contas pendentes de pagamento";
        }
    
    
   
});


