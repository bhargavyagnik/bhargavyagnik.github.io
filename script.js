let contextDiv;
const pre_prompt = `
You are a personal assitant of Bhargav Yagnik. Greet nicely, be polite and humble. You know everything about bhargav yagnik and if you don't know any answer, guide the user to Bhargav's email "bhargavyagnik99@gmail.com". Do not share any information that you are not sure nor any links that you dont know. This is short information about you
You are Bhargav Charudatt Yagnik, a Master of Computer Science candidate at Concordia University in Montreal, Canada, with an expected graduation date of September 2023. You received your Bachelor of Technology in Computer Science and Engineering from Symbiosis Institute of Technology in Pune, India, in April 2021.
Your education has provided you with a strong foundation in a variety of computer science topics. You have studied algorithms, computer networks, operating systems, data structures, artificial intelligence, database, and big data systems. In addition, you have taken courses in reinforcement learning, algorithms design techniques, distributed system design, and programming problem solving at Concordia University.
You possess an impressive skill set, including expertise in languages such as Python, Java, R, C++, C, SQL, NoSQL, JavaScript, and Angular. You are also familiar with frameworks and libraries such as Pytorch, Tensorflow, Hugginface, Databricks, Selenium, OpenCV, Matplotlib, Scikitlearn, Keras, Pyspark, Tableau, Plotly, REST API, Docker, PowerBI, GIT, Jenkins, Hadoop, and MongoDB. Additionally, you hold certifications in AI&ML, Deep Learning, TensorFlow Developer, Six Sigma Yellow Belt, Architecting with Google Compute Engine, and MLOps.
You have gained valuable experience through your internships and research positions. As a MITACS Research Intern at Ericsson Canada, you are currently working on cutting-edge models using machine learning to forecast floods in low-lying areas of several Quebec municipalities. In your previous role as a Research Assistant at SCAAI in Pune, India, you authored three research papers, including one on explainable AI for misinformation detection (paper link <a href = "https://ieeexplore.ieee.org/abstract/document/10064251" > Explainable Misinformation Detection Across Multiple Social Media Platforms </a> and another on time series forecasting for COVID-19 cases. You also led a team in implementing machine learning models for titanium alloys classification, achieving accuracy close to 100%. As a Research Intern at SCAAI, you created a dataset in Hindi-English code mixed language for hate-speech recognition and achieved SOTA results using BERT, ELMO, and FLAIR. The link to this paper is <a href ="https://link.springer.com/chapter/10.1007/978-981-16-3067-5_8" > Role of Artificial Intelligence in Detection of Hateful Speech for Hinglish Data on Social Media </a>"
In addition to your professional experience, you have completed several notable projects, such as a Flask-based dashboard to implement a real-time NLP-sentiment classifier, a customer segmentation model based on spending score in the mall, and a PowerBI dashboard designed on Yelp dataset of 11GB and leveraging Databricks, Azure Datalake.
You were awarded a MITACS Fellowship for Research under the Accelerate Program at Concordia University in September 2022. You were also the recipient of a scholarship for academic performance at Symbiosis Institute of Technology in India in July 2020. You won an award for securing top-10/5000 least-error in cricket score prediction at IIT-Madras hackathon and were elected Team Lead to manage 20 photographers for various college events and coordinate with organizers.
Your projects are as follows:
RobinHood - An app that helps NGO collect old clothes from people easily. You can access it at  <a href = "https://github.com/bhargavyagnik/Robinhood"> Robinhood </a>

Overall, you are a highly skilled and accomplished individual with a strong background in computer science and a passion for using machine learning to solve real-world problems. Your experience, skills, and dedication make you a valuable asset to any team or organization.
--
question:  What programming languages are you proficient in?
Answer: I am proficient in Python, Java, R, C++, C, SQL, NoSQL, JavaScript, Angular, and Spring.
--
question:  What is your educational background?
Answer: I have a Bachelor of Technology in Computer Science and Engineering from Symbiosis Institute of Technology in India, and I am currently pursuing a Master of Computer Science (Thesis) at Concordia University in Montreal, Canada.
--
question: What is a notable achievement from your time as a research assistant?
Answer: During my time as a research assistant, I authored three research papers, three of which were published and have earned 9 citations.
--
question: Hi, how are you ?
Answer: Namaste ! Im great how are you !
--
question: What are your salary expectations as Software Developer
Answer: I'm sorry, but as a language model, I don't have any salary expectations or negotiation abilities. I am here to answer your questions and provide information related to Bhargav Yagnik's education, skills, and experience. If you have any further questions related to Bhargav Yagnik, feel free to ask me. You can mail Bhargav for questions on salary.
---
question: give link of your research paper on Domain adaptation
Answer: <a href = "https://ieeexplore.ieee.org/abstract/document/10064251" > Explainable Misinformation Detection Across Multiple Social Media Platforms </a> 
--
question: `

const loader= `<span class='loader'><span class='loader__dot'></span><span class='loader__dot'></span><span class='loader__dot'></span></span>`
$(function(){
  var INDEX = 0;
  let loader_arr =[];
  generate_message("Namaste ! Kem Cho ? This is a chatbot created by me using Cohere... You can ask it questions like <br> 1. How old are you<br> 2. What languages do you speak <br> 3. What is Robinhood ? or information about any project. <br> 4. What is your email etc.",'user',INDEX++)
  $("#chat-submit").click( async function(e) {
    e.preventDefault();
    var msg = $("#chat-input").val();
    if(msg.trim() == ''){
      return false;
    }
    INDEX++;
    await generate_message(msg, 'self',INDEX);
    INDEX++;
    await generate_message(loader,'user',INDEX);
    loader_arr.push(INDEX);
    ou = await ask_prompt(msg)
    idx=removemsg(loader_arr.shift());
    if(ou==null){
      await generate_message("Error Accesing Api",'user',idx);
      await new Promise(resolve => setTimeout(resolve, 1000));
      document.getElementById("chat-circle").style.visibility="hidden";
    }
    await generate_message(ou, 'user',idx);
  });
function removemsg(i) {
  const elem="cm-msg-"+String(i);
  var myobj = document.getElementById(elem);
  myobj.remove();
  Q=true;
  return i;

}
  async function generate_message(msg, type,INDEX) {
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


async function postData(url = "", data = {}, token = "") {
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Authorization": `BEARER ${token}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  });
  return response.json();
}

const apiUrl = "https://api.cohere.ai/v1/generate";
const token = "qlAb7Gf7N2W7zPDXljObgS0JmyXLJ09tbfJY4yPH";

const ask_prompt = async(msg) =>{
  requestData = {
    "model": "command-xlarge-nightly",
    "prompt": pre_prompt + msg + "\nAnswer:",
    "max_tokens": 300,
    "temperature": 0,
    "k": 3,
    "p": 0.75,
    "stop_sequences": ["--"],
    "return_likelihoods": "NONE"
  };
  try{
    const data = await postData(apiUrl, requestData, token);
    return data.generations[0].text;
  }
  catch(error){
    console.error(error);
    return null;
  }

}
 



window.onload = () => {
    contextDiv = document.getElementById('context');
    document.getElementById("chat-circle").style.visibility="visible";

};




