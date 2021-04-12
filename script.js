let contextDiv;
let model;
const loader= `<span class='loader'><span class='loader__dot'></span><span class='loader__dot'></span><span class='loader__dot'></span></span>`
$(function() {
  var INDEX = 0;
  generate_message("Namaste ! Im Euler, and I represent Bhargav. You can ask me anything about Bhargav, his work etc. You can ask me questions like <br> 1. What is your age<br> 2. What languages do you speak <br> 3. What is Robinhood ? or information about any project. <br> 4. What is your email etc.",'user')
  $("#chat-submit").click(  async function(e) {
    e.preventDefault();
    var msg = $("#chat-input").val();
    if(msg.trim() == ''){
      return false;
    }
    await generate_message(msg, 'self');
    await generate_message(loader,'user');
    await new Promise(resolve => setTimeout(resolve, 500));
    INDEX=removemsg(INDEX);
    out = await process(msg, contextDiv);
    console.log(out)
    if (out.length >0) {
      ou = out[0].text;
    } else {
      ou = "Sorry I am not aware ! <a href='https:\/\/www.bhargavyagnik.ml\/#contact'> Please inform and he'll improve me ! <\/a>";
    }
    await generate_message(ou, 'user');
  });
function removemsg(i) {
  const elem="cm-msg-"+String(i);
  var myobj = document.getElementById(elem);
  myobj.remove();
  Q=true;
  return i--;

}
  async function generate_message(msg, type) {
    INDEX++;
    var str="";
    str += "<div id='cm-msg-"+INDEX+"' class=\"chat-msg "+type+"\">";
    str += "          <span class=\"msg-avatar\">";
    if(type=="self"){
      str += "            <img src=\"static\/flashman.jpg\">";
    }
    else{str += "            <img src=\"static\/bhargav.png\">";}
    str += "          <\/span>";
    str += "          <div class=\"cm-msg-text\">";
    str += msg;
    str += "          <\/div>";
    str += "        <\/div>";
    $(".chat-logs").append(str);
    $("#cm-msg-"+INDEX).hide().fadeIn(300);
    if(type == 'self'){
     $("#chat-input").val('');
    }
    $(".chat-logs").stop().animate({ scrollTop: $(".chat-logs")[0].scrollHeight}, 1000);
  }

  $(document).delegate(".chat-btn", "click", function() {
    var value = $(this).attr("chat-value");
    var name = $(this).html();
    $("#chat-input").attr("disabled", false);
    generate_message(name, 'self');
  })

  $("#chat-circle").click(function() {
    $("#chat-circle").toggle('scale');
    $(".chat-box").toggle('scale');
  })

  $(".chat-box-toggle").click(function() {
    $("#chat-circle").toggle('scale');
    $(".chat-box").toggle('scale');
  })

});

const process = async (input,contextDiv) => {
    const answers = await model.findAnswers(input, contextDiv.value);
    // console.log(answers);
    return answers;
};
const load=async()=>{
  console.log("Loading model");
  model = await qna.load();
  console.log("Model loaded");
  document.getElementById("chat-circle").style.visibility="visible";
};

window.onload = () => {
    console.log('Successfully loaded model');
    contextDiv = document.getElementById('context');
    document.getElementById("chat-circle").style.visibility="hidden";
    load();
};




