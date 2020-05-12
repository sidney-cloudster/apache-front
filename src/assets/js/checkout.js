$(document).ready(function(){

$('#cartao').mask('0000 0000 0000 0000');
$('#validade').mask('00/0000');
$('#cvv').mask('999');


var card = new Card({
  // a selector or DOM element for the form where users will
  // be entering their information
  form: '#form-cartao', // *required*
  // a selector or DOM element for the container
  // where you want the card to appear
  container: '.card-wrapper', // *required*

  formSelectors: {
      numberInput: 'input#cartao', // optional — default input[name="number"]
      expiryInput: 'input#validade', // optional — default input[name="expiry"]
      cvcInput: 'input#cvv', // optional — default input[name="cvc"]
      nameInput: 'input#nome' // optional - defaults input[name="name"]
  },

  width: 310, // optional — default 350px
  formatting: true, // optional - default true

  // Strings for translation - optional
  messages: {
      validDate: 'valid\ndate', // optional - default 'valid\nthru'
      monthYear: 'mm/yyyy', // optional - default 'month/year'
  },

  // Default placeholders for rendered fields - optional
  placeholders: {
      number: '•••• •••• •••• ••••',
      name: 'Nome Impresso',
      expiry: '••/••',
      cvc: '•••'
  },

  masks: {
      cardNumber: '•' // optional - mask card number
  },

  // if true, will log helpful messages for setting up Card
  debug: false // optional - default false
});

}); 