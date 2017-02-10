/* global $, Stripe */
//Document Ready 
$(document).on('turbolinks:load', function(){
  var theForm = $('#pro_form');
  var submitBtn = $('#form-submit-btn');
  //Set Stripe publick_key
  Stripe.setPublishableKey( $('meta[name="stripe-key"]').attr('content') );
  //When User clicks form submit
  submitBtn.click(function(event){
    //prevent default submission behaviour
    event.preventDefault();
    
    //Collect credit card fields    
    var ccNum = $('#card_number').val(),
        cvcNum = $('#card_code').val(),
        expMonth = $('#card_month').val(),
        expYear = $('#card_year').val();
    
    //Send card info to stripe
    Stripe.createToken({
      number: ccNum,
      cvc: cvcNum,
      exp_month: expMonth,
      exp_year: expYear
    }, stripeResponseHandler);
        
  });
  
  
  
  
  //Stripe returns a card Token
  //Inject card token as a hidden field into form
  //Submit form to our Rails app
});