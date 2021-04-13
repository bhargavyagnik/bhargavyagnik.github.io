let contextDiv;
let model,model1;
const loader= `<span class='loader'><span class='loader__dot'></span><span class='loader__dot'></span><span class='loader__dot'></span></span>`
$(function() {
  var INDEX = 0;
  generate_message("Namaste ! Kem Cho ? This is a chatbot created by me using Tensorflow and BERT... You can ask it questions like <br> 1. How old are you<br> 2. What languages do you speak <br> 3. What is Robinhood ? or information about any project. <br> 4. What is your email etc.",'user')
  $("#chat-submit").click(  async function(e) {
    e.preventDefault();
    var msg = $("#chat-input").val();
    if(msg.trim() == ''){
      return false;
    }
    await generate_message(msg, 'self');
    await generate_message(loader,'user');
    await new Promise(resolve => setTimeout(resolve, 1000));
    out = await process(msg, contextDiv);
    outt= await ask(msg);
    // console.log(out);
    if (out.length >0) {
      ou = out[0].text;
    } else {
      out = await ask(msg);
      ou = "<b>"+ out +"<\/b> If you feel the answer was wrong <a href='https:\/\/www.bhargavyagnik.ml\/#contact'> Please inform Bhargav, he'll improve ! <\/a>";
    }
    INDEX=removemsg(INDEX);
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
    $("#cm-msg-"+INDEX).hide().fadeIn(200);
    if(type == 'self'){
     $("#chat-input").val('');
    }
    $(".chat-logs").stop().animate({ scrollTop: $(".chat-logs")[0].scrollHeight}, 100);
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

const process = async (input,contextDiv,callback) => {
    const answers = await model.findAnswers(input, contextDiv.value);
    // console.log(answers);
    return answers;
    callback();
};

async function ask(que,callback){

  const input = {
    queries: [que],
    responses: ["Hi",
        "Bhargav",
        "21",
        "Computer Science Engineering student passing out in 2021",
        "B.Tech Symbiosis Institute of Technology, Pune.",
        "My interests lie in Artificial intelligence and Machine learning",
        "Ikigai and The autobiography of Yogi",
        "2",
        "\"Machine Learning Methods for Titanium Alloys Classification\" and \"Detection of Hateful Speech for Hinglish Data on Social Media\"",
        "Symbiosis Centre for applied AI with a role of research intern",
        "I am working on projects in Natural Language Processing",
        "Python, C, C++, JAVA etc",
        "Tensorflow, Pytorch, Flask etc",
        "English, Hindi, Sanskrit , Gujarati and French",
        "5",
        "GRE Flashcards are Flashcards helpful for students interested in improving vocabulary. With more than 2500 words.",
        "Andhadhun is an app for specially abled to control pc with voice commands, control mouse using hand tracking and support for colour blinds to adjust screen colours easily.",
        "Mask Detector : Computer Vision based face mask detection technique with ML .",
        "COVID dashboard : An accurate Covid dashboard with prediction for cases for next 3-4 days.",
        "AI Chess : A Chess bot that can beat a level 10 chess player and it is very quick to act .",
        "Robinhood app: An app that helps NGO collect old clothes from people easily .",
        "Reading books, Playing games and creating innovative products",
        "You can find photos at instagram/yagnikbhargav",
        "You can see me tweet at twitter@YagnikBhargav",
        "Feel free to mail me at bhargavyagnik99@gmail.com",
        "Find my amazing projects on github/bhargavyagnik",
        "Connect with me on linkedin@bhargavyagnik",
        "I made this chatbot  using Tensorflow js and Universal Sentence encoder",
        "Good bye have a great day.It was good taking to you, thank you, Bye bye."
        ],
    contexts:["Hello Namaste ",
        "My name is Bhargav Yagnik, This Website is made, designed, ideated and created by BhargavYagnik",
        "My age is 21 years old.",
        "I am a student studying in Final year computer science engineering ",
        "I studied Bachelor of Technology at college called Symbiosis Institute of Technology, under Symbiosis  International University",
        "My interests lie in Artificial intelligence and Machine learning",
        "My favourite books are \"Ikigai\" and \"The Autobiography of Yogi\"",
        "I have authored and published two research papers",
        "THe research papers are titled \"Machine Learning Methods for Titanium Alloys Classification\" and \"Detection of Hateful Speech for Hinglish Data on Social Media\"",
        " I am currently working  at Symbiosis Centre for applied AI with a role of research intern. ",
        "I am working on projects in Natural Language Processing",
        "I know programming languages like Python, C, C++, JAVA etc.",
        "I have experience on frameworks like Tensorflow, Pytorch, Flask etc",
        "I can speak in English, Hindi, Sanskrit , Gujarati and French",
        "I know 5 languages",
        "GRE Flashcards are Flashcards helpful for students interested in improving vocabulary. With more than 2500 words.",
        "Andhadhun is an app for specially abled to control pc with voice commands, control mouse using hand tracking and support for colour blinds to adjust screen colours easily.",
        "Mask Detector : Computer Vision based face mask detection technique with ML .",
        "COVID dashboard : An accurate Covid dashboard with prediction for cases for next 3-4 days.",
        "AI Chess : A Chess bot that can beat a level 10 chess player and it is very quick to act .",
        "Robinhood app: An app that helps NGO collect old clothes from people easily .",
        "My hobbies include reading books, playing games and creating things like me .",
        "I post and portray my photography skills at My Instagram : instagram@yagnikbhargav.",
        "I usually tweet on My Twitter : twitter@YagnikBhargav.",
        "My Email is or bhargavyagnik99@gmail.com . You can contact me at bhargavyagnik99@gmail.com for queries or collaborations. I am open to collaborate and work on  interesting projects",
        "Github username: github/bhargavyagnik.",
        "You can connect with me on Linkedin : linkedin@bhargavyagnik",
        "I made this chatbot  using Tensorflow js and BERT.",
        "Good bye have a great day.It was good taking to you, thank you, Bye bye."
    ]
  };
  var scores = [];
  const embeddings = model1.embed(input);
  const embed_query = embeddings['queryEmbedding'].arraySync();
  const embed_responses = embeddings['responseEmbedding'].arraySync();
  // compute the dotProduct of each query and response pair.
  for (let i = 0; i < input['queries'].length; i++) {
    for (let j = 0; j < input['responses'].length; j++) {
      scores.push(dotProduct(embed_query[i], embed_responses[j]));
    }
  }
  const x = tf.tensor1d(scores);
  const prob = x.dataSync()[0];
  const ans= x.argMax().dataSync()[0];
  // console.log(prob);
  // console.log(input["responses"][ans]);
  return input["responses"][ans];
  callback();
}

// Calculate the dot product of two vector arrays.
const dotProduct = (xs, ys) => {
  const sum = xs => xs ? xs.reduce((a, b) => a + b, 0) : undefined;

  return xs.length === ys.length ?
    sum(zipWith((a, b) => a * b, xs, ys))
    : undefined;
};

// zipWith :: (a -> b -> c) -> [a] -> [b] -> [c]
const zipWith =
    (f, xs, ys) => {
      const ny = ys.length;
      return (xs.length <= ny ? xs : xs.slice(0, ny))
          .map((x, i) => f(x, ys[i]));
    };



const load=async()=>{
  console.log("Loading BERT model");
  model = await qna.load();
  console.log("BERT Model loaded");
  console.log("Loading Universal Sentence Encoder model");
  model1 = await use.loadQnA();
  console.log("Universal Sentence Encoder model loaded");
  document.getElementById("chat-circle").style.visibility="visible";
};

window.onload = () => {
    console.log('Successfully loaded model');
    contextDiv = document.getElementById('context');
    document.getElementById("chat-circle").style.visibility="hidden";
    load();
};




