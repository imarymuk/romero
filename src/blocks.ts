let blocksRaw = {
  init: [
    {
      type: "horizontal-bar",
    },
    {
      type: "system-note",
      message:
        "Mr. Romero is already annoyed before his conversation with you. Make the right decisions to reduce his frustration and restore his satisfaction.",
    },
    {
      type: "barometer",
      points: 0,
      expression: "none",
      message: "How would you like to start the conversation?",
    },
    {
      type: "system-options",
      options: [
        {
          label: "Hello, James Edward here. What can I do for you?",
          nextNode: "coldWelcome",
        },
        {
          label: "Hello and welcome to Sunrise. My name is James Edward, how can I help you?",
          nextNode: "warmWelcome",
        },
      ],
    },
  ],

  coldWelcome: [
    {
      type: "customer-message",
      messages: [
        "Yes, it's great how you are welcomed here...",
        "This is Romero, Tobias.",
      ],
    },
    {
      type: "barometer",
      points: +2,
      expression: "none",
      message:
        "You realise that the curt greeting didn't make the customer feel welcome. In future, use the greeting to get the conversation off to a good start and make it positive right from the start. ",
    },
    {
      type: "reference",
      nextNode: "helloAndWelcome",
    },
  ],

  warmWelcome: [
    {
      type: "customer-message",
      messages: ["Yes, good afternoon. This is Romero, Tobias."],
    },
    {
      type: "reference",
      nextNode: "helloAndWelcome",
    },
  ],

  helloAndWelcome: [
    {
      type: "system-options",
      options: [{ label: "Hello Mr Romero.", nextNode: "helloMrRomero" }],
    },
  ],

  helloMrRomero: [
    {
      type: "customer-message",
      messages: [
        "I moved into my new flat a week ago and my internet connection is still not working.",
        "I can't work like this, I've been putting off tasks that should be done for days and I have an important online appointment tomorrow. Until then, the connection has to work!",
      ],
    },
    {
      type: "horizontal-bar",
    },
    {
      type: "system-note",
      message: "In order to better understand Mr Romero's emotional reaction, it is useful to understand the cause of his frustration. What is it in this situation?"
    },
    {
      type: "system-options",
      variant: 'primary',
      options: [
        { label: "Goal", nextNode: "dependencePath" },
        { label: "Dependence", nextNode: "dependencePath" },
        { label: "Urgency", nextNode: "urgencyPath" },
        { label: "Importance", nextNode: "dependencePath" }
      ]
    }
  ],
  dependencePath: [
    {
      type: "horizontal-bar",
    },
    {
      type: "system-note",
      message: "Frustration can of course have several causes. In this case, however, the urgency is clearly in the foreground. Mr Romero is worried that he won't be able to keep his scheduled appointment tomorrow."
    },
    {
      type: "reference",
      nextNode: "questionPath"
    }
  ],
  urgencyPath: [
    {
      type: "horizontal-bar",
    },
    {
      type: "system-note",
      message: "You are right. Urgency is the main priority here. Mr Romero is worried that he won't be able to keep his planned appointment tomorrow."
    },
    {
      type: "reference",
      nextNode: "questionPath"
    }
  ],

  questionPath: [
    {
      type: "horizontal-bar",
    },
    {
      type: "system-note",
      message: "How would you like to respond to Mr Romero's concerns?"
    },
    {
      type: "system-options",
      options: [
        {
          label: "Yes, Mr Romero, that's annoying. Why are you only calling now?",
          nextNode: "understandFrustrationOne",
        },
        {
          label: "I can understand your frustration, Mr Romero. I'll do my best to get the Internet up and running.",
          nextNode: "understandFrustrationTwo",
        },
        {
          label: "Stay calm, Mr Romero, and give me your customer number first. Then I'll see what's going on.",
          nextNode: "understandFrustrationThree",
        },
      ]
    }
  ],

  understandFrustrationOne: [
    {
      type: "customer-message",
      messages: [
        "Yes, what do you think? I've already called twice this week! And you still haven't managed tohere solve the problem. The service is really disappointing...!",
        "I'm a loyal customer, I've been with you for 5 years, so I can expect that problems will be dealt with properly and that everything will be done to ensure that my Internet connection works.",
      ],
    },
    {
      type: "barometer",
      points: +5,
      expression: "angry",
      message:"Oh dear, you've triggered a whole parade of abuse with your question and the customer won't stop complaining...",
    },
    {
      type: "reference",
      nextNode: "Question_monologue",

    },
  ],

  understandFrustrationTwo: [
    {
      type: "customer-message",
      messages: [
        "I've already called twice and that's exactly what your colleagues have already said. And what is it...? The Internet still doesn't work! The service here is really disappointing!",
        "I'm a loyal customer, I've been with you for 5 years, so I can expect that problems will be dealt with properly and that everything will be done to ensure that my Internet connection works.",
      ],
    },
    {
      type: "horizontal-bar",
    },
    {
      type: "barometer",
      points: +2,
      expression: "angry",
      message:"Oh dear, although you did everything right and reacted with understanding for the frustration, the customer couldn't be stopped and got carried away.",
    },
    {
      type: "horizontal-bar",
    },
    {
      type: "reference",
      nextNode: "Question_monologue",

    },
  ],

  understandFrustrationThree: [
    {
      type: "customer-message",
      messages: [
        "Keep calm! You are funny. This is the third time I've had to call about this problem. How can you stay calm! The service here is really disappointing!",
        "I'm a loyal customer, I've been with you for 5 ywillears, so I can expect that problems be dealt with properly and that everything will be done to ensure that my Internet connection works.",
      ],
    },
    {
      type: "barometer",
      points: +5,
      expression: "angry",
      message:"Oh dear, you've achieved the opposite with your attempts at reassurance and triggered a whole parade of abuse. The customer won't even stop complaining...",
    },
    {
      type: "reference",
      nextNode: "Question_monologue",

    },
  ], 
  
  Question_monologue: [
    {
      type: "horizontal-bar"
    },
    {
      type: "system-note",
      message: "What can you do to end this monologue of frustration?",
    },
    
    {
      type: "system-options",
      variant: "primary",
      
      options: [
        {
          label: "I wait for a pause for breath and then intervene.",
          nextNode: "monologue_option_01",
        },
        {
          label: "I try to politely interrupt the customer immediately.",
          nextNode: "monologue_option_02",
        },
        {
          label: "I let the customer finish speaking first.",
          nextNode: "monologue_option_03",
        },
      ]
    },
  ],

  monologue_option_01: [
    {
      type: "horizontal-bar",
    },
    {
      type: "barometer",
      points: -5,
      expression: "happy",
      message: "Very good, this way you give the customer space to express their frustration, allowing them to vent emotionally.",
    },
    {
      type: "reference",
      nextNode: "call_again"
    }
  ], 

  monologue_option_02: [
    {
      type: "horizontal-bar",
    },
    {
      type: "system-options",

      options: [
        {
          label: "Mr Romero, please let me have my say. Then we can find a solution.",
          nextNode: "monologue_option_two_solution",
        },
      ]
    },
    {
      type: "customer-message",
      messages: [
        "No, you know how annoying this is! For the third... THIRD... time I call here and the Internet is still not working. If I'm still sitting here tomorrow without internet, I'm telling you, I'm cancelling."
      ],
    },
    {
      type: "barometer",
      points: +5,
      expression: "angry",
      message: "Interrupting immediately tends to make the customer feel that they don't belong. First give the customer space to express their frustration and wait for a breathing space before interrupting. ",
    },
    {
      type: "reference",
      nextNode: "call_again"
    }
  ],

  monologue_option_03: [
    {
      type: "horizontal-bar",
    },
    {
      type: "barometer",
      points: -5,
      expression: "happy",
      message: "Very good, this way you give the customer's frustration space, which allows the customer to vent emotionally.",
    },
    {
      type: "reference",
      nextNode: "call_again"
    }
  ], 

  call_again: [
    {
      type: "horizontal-bar",
    },
    { 
      type: "system-options",
      options: [
        {
          label: "I understand your frustration, it's really unfortunate that you have to call again. ",
          nextNode: ""
        }
      ]
    },
    {
      type: "customer-message",
      messages: [
        "Yes, you can say that again."
      ]
    },
    {
      type: "system-options",
      options: [
        {
          label: "I'll make sure you have internet at your new address right away.",
          nextNode: "instant_promise"
        },
        {
          label: "I'll look into what went wrong straight away. Can you give me your customer number, Mr Romero?",
          nextNode: "ask_customer_no"
        }
      ]
    }
  ],

  instant_promise: [
    {
      type: "horizontal-bar"
    },
    {
      type: "system-note",
      message: "But you're being a little premature. You don't even know what the cause of the problem is yet, so avoid making such promises at this point. First ask for the customer number to get an overview of the history of the issue."
    },
    {
      type: "system-options",
      options: [
        {
          label: "Do you have your customer number to hand, Mr Romero? Then I can check what has already been noted in our system regarding your request. ",
          nextNode: "" //empty
        }
      ]
    },
    {
      type: "reference",
      nextNode: "customer_details"
    }
  ],

  ask_customer_no: [
    {
      type: "horizontal-bar"
    },
    {
      type: "barometer",
      points: -2,
      expression: "happy",
      message: "Very good. You show the customer that you care about their issue and feel responsible for finding a solution. "
    },
    {
      type: "reference",
      nextNode: "customer_details"
    }
  ],

  customer_details: [
    {
      type: "customer-message",
      messages: [
        "Ok, yes. My customer number is 122 334 234.",
        "And you probably want to know my password now. This is: Romero. "
      ]
    },
    {
      type: "system-options",
      options: [
        {
          label: "All right.",
          nextNode: "cold_response"
        },
        {
          label: "Thank you very much, Mr Romero",
          nextNode: "good_response"
        }
      ]
    }
  ],

  cold_response: [
    {
      type: "horizontal-bar"
    },
    {
      type: "system-note",
      message: "Remember, it's especially important to be polite in critical situations."
    },
    {
      type: "reference",
      nextNode: "customer_account_opened"
    }
  ],

  good_response: [
    {
      type: "horizontal-bar"
    },
    {
      type: "barometer",
      points: -2,
      expression: "happy",
      message: "Great, it's especially important to be polite in critical situations. "
    },
    {
      type: "reference",
      nextNode: "customer_account_opened"
    }
  ],

  customer_account_opened: [
    {
      type: "system-options",
      options: [
        {
          label: "So..., I have now opened your customer account.",
          nextNode: "" //it will remain empty
        }
      ]
    },
    {
      type: "system-options",
      options: [
        {
          label: "Why don't you explain to me again what exactly happened?",
          nextNode: "asking_to_repeat_the_process"
        },
        {
          label: "I'll now look at what has already been documented about your request.",
          nextNode: "check_problem_at_your_own"
        },
        {
          label: "As I understand it now, the boarding school doesn't work after a move, right?",
          nextNode: "lack_of_understanding"
        }
      ]
    }
  ],
  
  asking_to_repeat_the_process: [
    {
      type: "customer-message",
      messages: [
        "But I've just explained that! Are you not listening?"
      ]
    },
    {
      type: "barometer",
      points: +5,
      expression: "angry",
      message: "In future, first check the history to see if anything has already been documented on the subject and let the customer know. This will give them the feeling that you are making an effort to understand their concerns."
    },
    {
      type: "system-options",
      options: [
        {
          label: "I'm just looking to see what I can find about your request in our documentation.",
          nextNode: "" //stay empty
        }
      ]
    },
    {
      type: "reference",
      nextNode: "issue_already_raised_in_system"
    }
  ],

  check_problem_at_your_own: [
    {
      type: "customer-message",
      messages: [
        "Ok, yes. I'm sure there's already something in there."
      ]
    },
    {
      type: "barometer",
      points: -5,
      expression: "happy",
      message: "Super. You have given the customer the feeling that you are making an effort to understand their concerns. "
    },
    {
      type: "reference",
      nextNode: "issue_already_raised_in_system"
    }
  ],

  lack_of_understanding: [
    {
      type: "customer-message",
      messages: [
        "Yes, exactly. But I've just explained that."
      ]
    },
    {
      type: "barometer",
      points: +2,
      expression: "angry",
      message: "In future, first check the history to see if anything has already been documented on the subject. That way you avoid unnecessary repetition."
    },
    {
      type: "system-options",
      options: [
        {
          label: "I'm just looking to see what I can find about your issue in our documentation.",
          nextNode: "" //stay empty
        }
      ]
    },
    {
      type: "reference",
      nextNode: "issue_already_raised_in_system"
    }
  ],

  issue_already_raised_in_system: [
    {
      type: "system-options",
      options: [ 
        {
          label: "I can see that there is already a ticket for your issue in our system.",
          nextNode: "" //stay empty
        }
      ]
    },
    {
      type: "customer-message",
      messages: [
        "Yes, I hope so. The question then is why nothing has happened yet..."
      ]
    },
    {
      type: "system-options",
      options: [
        {
          label: "Yes, unfortunately I don't know that either...",
          nextNode: "reasoning_opt_01"
        },
        {
          label: "There are a lot of tickets being processed at the moment, so it can take a while.",
          nextNode: "reasoning_opt_02"
        },
        {
          label: "I'll check the status of the ticket straight away, just a moment Mr Romero.",
          nextNode: "reasoning_opt_03"
        }
      ]
    }
  ],

  reasoning_opt_01: [
    {
      type: "customer-message",
      messages: [
        "That's really great... What's going on with you? Nobody has a clue about anything!"
      ]
    },
    {
      type: "barometer",
      points: +5,
      expression: "angry",
      message: "In future, make sure you always give the customer the feeling that you have an overview and know what needs to be done."
    },
    {
      type: "reference",
      nextNode: "combined_01_and_02"
    }
  ],

  reasoning_opt_02: [
    {
      type: "customer-message",
      messages: [
        "No wonder you've got so many tickets if you can't even manage to re-register in time. I registered the move a week in advance."
      ]
    },
    {
      type: "barometer",
      points: +5,
      expression: "angry",
      message: "Even if this is the case, such statements give the impression that you want to provide justification. Instead, remain solution-orientated and check what is going on with the ticket."
    },
    {
      type: "reference",
      nextNode: "combined_01_and_02"
    }
  ],

  combined_01_and_02: [
    {
      type: "system-options",
      options: [
        {
          label: "I'm currently checking the status of the ticket. This will show us the current status of the processing of your request.",
          nextNode: "redirect_to_IT_dep"
        }
      ]
    }
  ],

  reasoning_opt_03: [
    {
      type: "customer-message",
      messages: [
        "Yes, you should do that."
      ]
    },
    {
      type: "barometer",
      points: -2,
      expression: "happy",
      message: "Very good, solution-orientated approach!"
    },
    {
      type: "reference",
      nextNode: "redirect_to_IT_dep"
    }
  ],

  redirect_to_IT_dep: [
    {
      type: "system-options",
      options: [
        {
          label: "As far as I can see, the ticket has already been assigned to an IT employee. This means that it should be dealt with today.",
          nextNode: ""
        }
      ]
    },
    {
      type: "customer-message",
      messages: [
        "Yes, it should... And what if it isn't? Then I'll have to call again. Can't you just do that quickly?"
      ]
    },
    {
      type: "system-options",
      options: [
        {
          label: "No, I can't do that, I'm sorry.",
          nextNode: "straight_no"
        },
        {
          label: "Unfortunately, only our IT department can do that.",
          nextNode: "reasonable_no"
        }
      ]
    }
  ],

  straight_no: [
    {
      type: "customer-message",
      messages: [
        "Can't or don't you want to...?"
      ]
    },
    {
      type: "horizontal-bar"
    },
    {
      type: "barometer",
      points: +5,
      expression: "angry",
      message: "The customer has not understood that only our IT department can make the changeover and thinks you don't want to make any more effort.",
    },
    {
      type: "system-options",
      options: [
        {
          label: "I can't. Otherwise I would do it for you.",
          nextNode: "showing_regret" //this
        },
        {
         label: "Only our IT department can make the changeover. I don't have access to the required systems.",
          nextNode: "reason_of_delay" //this
        }
      ]
    }
  ],

  showing_regret: [
    {
      type: "customer-message",
      messages: [
        "Yes, I'm sorry to follow up again... You just get the feeling here that they don't want to help you!"
      ]
    },
    {
      type: "barometer",
      points: +2,
      expression: "angry",
      message: "Even if you can't solve the issue specifically, you can at least gain understanding from the customer through transparency."
    },
    {
      type: "system-options",
      options: [
        {
          label: "You need access to the systems required for the changeover. And only our IT department has this.",
          nextNode: "" //empty
        }
      ]
    },
    {
      type: "reference",
      nextNode: "reason_of_delay"
    }
  ],

  reason_of_delay: [
    {
      type: "customer-message",
      messages: [
        "Oh, I see"
      ]
    },
    {
      type: "barometer",
      points: -5,
      expression: "angry",
      message: "Very good. The customer now understands better why you can't solve the problem directly."
    },
    {
      type: "reference",
      nextNode: "customer_questioning_the_authority"
    }
  ],

  reasonable_no: [
    {
      type: "customer-message",
      messages: [
        "I see."
      ]
    },
    {
      type: "system-options",
      options: [
        {
          label: "You know, unfortunately I don't have access to the necessary systems. ",
          nextNode: "" //empty
        }
      ]
    },
    {
      type: "customer-message",
      messages: [
        "I see."
      ]
    },
    {
      type: "horizontal-bar"
    },
    {
      type: "barometer",
      points: -5,
      expression: "happy",
      message: "Very good, the customer now understands the reason why you can't process the request directly.",
    },
    {
      type: "reference",
      nextNode: "customer_questioning_the_authority"
    }
  ],

  customer_questioning_the_authority: [
    {
      type: "customer-message",
      messages: [
        "Does that mean you can't do anything for me now?" ]
    },
    {
      type: "system-options",
      options: [
        {
          label: "No, I'm sorry. The ticket has been closed and will definitely be processed by IT today.",
          nextNode: "agent_response_01"
        },
        {
          label: "No, unfortunately not. But I can give you a discount on your next basic fee as compensation for the time you've been without Internet.",
          nextNode: "agent_response_02" //how to merge this with reference
        },
        {
          label: "Please wait a moment, Mr Romero. I'll see if it's possible to speed up the process.",
          nextNode: "agent_response_03"
        }
      ]
    }
  ],

  agent_response_01: [
    {
      type: "customer-message",
      messages: [
        "I've always been put off by my colleagues by saying that the Internet would work... And nothing has ever happened.",
        "Is there any way of calling IT or something so that they can process the ticket immediately?"
      ]
    },
    {
      type: "horizontal-bar"
    },
    {
      type: "barometer",
      points: +5,
      expression: "angry",
      message: "The customer has noticeably lost confidence in our service. Now it's your job to show that we take our customers' concerns seriously."
    },
    {
      type: "system-options",
      options: [
        {
          label: "I understand your frustration Mr Romero. Let me check whether the ticket can be prioritised internally. One moment please",
          nextNode: "agent_call_help" //this function should call few lines and then goes to "B" slide 14
        },
        {
          label: "Believe me Mr Romero. I would like to do more for you. But unfortunately I can't intervene in the way IT works. You'll have to be patient today.",
          nextNode: "client_fed_up" //this function will be call again in agent response 2 branch and then towards "A" slide 14
        },
        {
          label: "No, unfortunately not, Mr Romero. But I will be happy to give you a discount on your next basic fee.",
          nextNode: "agent_response_02"
        }
      ]
    }
  ],

  agent_call_help: [
    {
      type: "customer-message",
      messages: [
        "Finally! Does the conversation really have to escalate for you to get help...?"
      ]
    },
    {
      type: "barometer",
      points: +5,
      expression: "angry",
      message: ""
    },
    {
      type: "reference",
      nextNode: "Slide_14_B" //"B" function starts from barometer message in slide 14
    }
  ], 

  agent_response_02: [
    {
      type: "customer-message",
      messages: [
        "That's all well and good that you want to give me a discount, but what I really need is a working Internet, and I need it now.",
        "I'm not going to be put off here again!"
      ]
    },
    {
      type: "barometer",
      points: +5,
      expression: "angry",
      message: "The customer is obviously not satisfied with material compensation. His request seems to be very urgent."
    },
    {
      type: "system-options",
      options: [
        {
          label: "I understand the urgency of your request, Mr Romero. But there's really nothing else I can do for you, I'm sorry. You'll have to be patient today. ",
          nextNode: "client_fed_up" //this function will be call again in agent response 1 branch and then toward "A" in slide 14
        },
        {
          label: "Okay, Mr Romero. Please wait a moment, I will check whether it is possible to speed up the process.",
          nextNode: "agent_response_03" //this function will merge with agent response 3 branch (client_satisfied)
        }
      ]
    }
  ],

  client_fed_up: [
    {
      type: "customer-message",
      messages: [
        "Be patient? You must be joking! I've been patient long enough. I want something to be done now, I'm really fed up.",
        "I have to be able to make my online appointment tomorrow!"
      ]
    },
    {
      type: "reference",
      nextNode: "Slide_14_A"
    }
  ],

  agent_response_03: [
    {
      type: "customer-message",
      messages: [
        "Yes, please do. Finally someone who understands the urgency.",
      ]
    },
    {
      type: "barometer",
      points: -10,
      expression: "happy",
      message: "Very good. As the customer has already called several times and his request is now quite urgent, an internal escalation of the ticket is the right approach here."
    },
    {
      type: "reference",
      nextNode: "Slide_14_B"
    }
  ],

  Slide_14_A: [
    {
      type: "barometer",
      points: +5,
      expression: "angry",
      message: "Oh dear, the conversation doesn't seem to be ending well. You should give in here and check with your team lead whether an internal escalation of the ticket is possible."
    },
    {
      type: "system-options",
      options: [
        {
          label: "Mr Romero, I will clarify whether the ticket relating to your request can be prioritised. Please wait a moment.",
          nextNode: "" //stay empty
        }
      ]
    },
    {
      type: "customer-message",
      messages: [
        "Finally! Does the conversation really have to escalate for you to get help...?"
      ]
    },
    {
      type: "barometer",
      points: -5,
      expression: "happy",
      message: ""
    },
    {
      type: "reference",
      nextNode: "Slide_14_B"
    }
  ],

  Slide_14_B: [
    {
      type: "horizontal-bar",
    },
    {
      type: "system-note",
      message: "You discuss Mr Romero's request with your team lead and you come to the conclusion that he will look at the ticket immediately with the responsible IT employee in order to resolve it today. ",
    },
    {
      type: "system-options",
      options: [
        {
          label: "So, the ticket has been prioritised and will be resolved today. However, I can't give you a 100 per cent guarantee of this.",
          nextNode: "good_response_01"
        },
        {
          label: "So Mr Romero, I've just spoken to my line manager and he's personally making sure that the ticket is now being processed.",
          nextNode: "good_response_02"
        }
      ]
    }
  ],

  good_response_01: [
    {
      type: "customer-message",
      messages: [ "Ok, that sounds very promising. " ]
    },
    {
      type: "horizontal-bar",
    },
    {
      type: "barometer",
      points: -2,
      expression: "happy",
      message: "The customer is cautiously optimistic. By explaining your agreement with your team lead, you can show that someone is already taking care of the ticket."
    },
    {
      type: "system-options",
      options: [
        {
          label: "My line manager will personally take care of it and look at the ticket with the responsible employee in IT.",
          nextNode: "" //stay empty
        }
      ]
    },
    {
      type: "customer-message",
      messages: [ "Ok, thank you." ]
    },
    {
      type: "barometer",
      points: -2,
      expression: "happy",
      message: ""
    },
    {
      type: "reference",
      nextNode: "show_responsilibility_for_issue" //use this in good_response_02
    }
  ],

  good_response_02: [
    {
      type: "customer-message",
      messages: [ "That's good news at last!" ]
    },
    {
      type: "horizontal-bar",
    },
    {
      type: "barometer",
      points: -5,
      expression: "happy",
      message: ""
    },
    {
      type: "reference",
      nextNode: "show_responsilibility_for_issue" //use this in good_response_01
    }
  ],

  show_responsilibility_for_issue: [
    {
      type: "system-note",
      message: "The customer's request is now being processed. A solution to the problem is therefore in progress. How do you continue the conversation to show that you feel responsible for the issue?"
    },
    {
      type: "system-options",
      options: [
        {
          label: "No problem, I'm happy to help them, that's what I'm here for. Is there anything else I can help you with?",
          nextNode: "show_responsilibility_opt_01"
        },
        {
          label: "If you like, Mr Romero, I can call you back as soon as the re-registration has been successfully completed. ",
          nextNode: "show_responsilibility_opt_02"
        }
      ]
    }
  ],

  show_responsilibility_opt_01: [
    {
      type: "system-note",
      message: "Before you deal with another potential customer issue, why don't you offer to call me back as soon as the ticket has been resolved? This way you show that you are continuously taking care of the issue and are interested in the issue being successfully resolved. "
    },
    {
      type: "system-options",
      options: [
        {
          label: "If you like, Mr Romero, I can call you back as soon as the re-registration has been successfully completed.",
          nextNode: "" //stay empty
        }
      ]
    },
    {
      type: "customer-message",
      messages: [
        "Oh yes, that would be great!"
      ]
    },
    {
      type: "barometer",
      points: -5,
      expression: "happy",
      message: ""
    },
    {
      type: "reference",
      nextNode: "problem_not_solved"
    }
  ],

  show_responsilibility_opt_02: [
    {
      type: "customer-message",
      messages: [
        "Oh yes, that would be great!"
      ]
    },
    {
      type: "barometer",
      points: -5,
      expression: "happy",
      message: "Great, by calling me back you show that you are continuously taking care of the matter and are interested in the matter being successfully resolved."
    },
    {
      type: "reference",
      nextNode: "problem_not_solved"
    }
  ],

  problem_not_solved: [
    {
      type: "customer-message",
      messages: [
        "However, I still can't work on my laptop..."
      ]
    },
    {
      type: "horizontal-bar"
    },
    {
      type: "system-note",
      message: [ "You see in the customer account that the customer has unlimited data on his Sunrise mobile phone. What do you do?" ]
    },
    {
      type: "system-options",
      variant: "primary",
      options: [
        {
          label: "Nothing, we have nothing to do with mobile phone contracts at WIN. ",
          nextNode: "customer_have_mob_data_01"
        },
        {
          label: "I point out to the customer that they can also use their mobile data on their laptop with a hotspot.",
          nextNode: "customer_have_mob_data_02" //this will be used as reference in customer_have_mob_data_01
        },
        {
          label: "I explain to the customer how he can still work on his laptop with a hotspot.",
          nextNode: "customer_have_mob_data_03"
        }
      ]
    }
  ],

  customer_have_mob_data_01: [
    {
      type: "horizontal-bar"
    },
    {
      type: "system-note",
      message: "At this point, you can still show the customer the possibility of working on a laptop with the help of a hotspot. Take the opportunity to demonstrate your expertise."
    },
    {
      type: "reference",
      nexNode: "customer_have_mob_data_02" //this is used in main functions as a options (second opt)
    }
  ],

  customer_have_mob_data_02: [
    {
      type: "horizontal-bar"
    },
    {
      type: "customer-message",
      messages: [ "Oh, that's a good idea, but I'm not sure how it works." ]
    },
    {
      type: "system-options",
      options: [
        {
          label: "It's not too difficult. There are lots of easy-to-understand instructions on the internet.",
          nextNode: "agent_response_on_hotspot_enabling_01"
        },
        {
          label: "I'd be happy to explain it to you, Mr Romero. ",
          nextNode: "agent_response_on_hotspot_enabling_02"
        }
      ]
    }
  ],

  agent_response_on_hotspot_enabling_01: [
    {
      type: "customer-message",
      messages: ["Aren't you also familiar with this and can you explain it to me briefly?"]
    },
    {
      type: "system-options",
      options: [
        {
          label: "Yes, of course.",
          nextNode: "agent_is_helping"
        },
        {
          label: "I really don't have time for this, Mr Romero. Other customers are waiting to be served.",
          nextNode: "agent_is_not_helping"
        }
      ]
    }
  ],
  
  agent_is_helping: [
    {
      type: "customer-message",
      messages: ["Thank you."]
    },
    {
      type: "barometer",
      points: -2,
      expression: "happy",
      message: ""
    },
    {
      type: "reference",
      nextNode: "hotspot_is_setup" //use this again
    }
  ],

  agent_is_not_helping: [
    {
      type: "customer-message",
      messages: ["Are you serious? Is that supposed to be good customer service?"]
    },
    {
      type: "horizontal-bar"
    },
    {
      type: "barometer",
      points: +5,
      expression: "angry",
      message: "The customer is right. That's not very accommodating. Take the time to restore customer satisfaction!"
    },
    {
      type: "system-options",
      options: [
        {
          label: "You're right, I'm sorry. I'll explain how it works. It's very quick",
          nextNode: "" //stay empty
        }
      ]
    },
    {
      type: "customer-message",
      messages: ["There you go, it works. "]
    },
    {
      type: "reference",
      nextNode: "hotspot_is_setup" //use this again
    }
  ],

  agent_response_on_hotspot_enabling_02:[
    {
      type: "customer-message",
      messages: ["Yes, with pleasure."]
    },
    {
      type: "barometer",
      points: -5,
      expression: "happy",
      message: "Great! The customer can now even work from his laptop in the meantime!"
    },
    {
      type: "horizontal-bar"
    },
    {
      type: "reference",
      nextNode: "hotspot_is_setup" //use this again
    }
  ],

  customer_have_mob_data_03: [
    {
      type: "horizontal-bar"
    },
    {
      type: "system-note",
      message: "Super! This way you show the customer your expertise and show that you are motivated to find an immediate solution!"
    },
    {
      type: "customer-message",
      messages: ["Oh, great, now I can even work from my laptop."]
    },
    {
      type: "barometer",
      points: -5,
      expression: "happy",
      message: "Good work! That's how you convince the customer of our good service."
    },
    {
      type: "horizontal-bar"
    },
    {
      type: "reference",
      nextNode: "hotspot_is_setup" //use this again
    }
  ],
  
  hotspot_is_setup: [
    {
      type: "horizontal-bar"
    },
    {
      type: "system-note",
      message: "The hotspot is now successfully set up. How do you continue?"
    },
    {
      type: "system-options",
      options: [
        {
          label: "Well, Mr Romero, you can continue working on your laptop now and as soon as the re-registration has been completed, I'll call you back. Is that all right?",
          nextNode: "next_step_after_hotspot_01"
        },
        {
          label: "So Mr Romero, that's all done now. Do you have any further questions?",
          nextNode: "next_step_after_hotspot_02"
        }
      ]
    }
  ],

  next_step_after_hotspot_01: [
    {
      type: "customer-message",
      messages: [ "Yes, thank you, that's fine." ]
    },
    {
      type: "reference",
      nextNode: "Slide_16_A"
    }
  ],

  next_step_after_hotspot_02: [
    {
      type: "customer-message",
      messages: [ "No, that's it, thank you." ]
    },
    {
      type: "reference",
      nextNode: "Slide_17_B"
    }
  ],

  //Slide 16 "A" block starts here

  Slide_16_A: [
    {
      type: "system-options",
      options: [
        {
          label: "Thank you for the constructive conversation and your patience!",
          nextNode: "A_customer_satisfied_01"
        },
        {
          label: "I will give you an additional discount on your next basic fee as compensation for the inconvenience.",
          nextNode: "A_customer_satisfied_02"
        }
      ]
    }
  ],

  A_customer_satisfied_01: [
    {
      type: "customer-message",
      messages: ["Yes, this time they really helped me."]
    },
    {
      type: "horizontal-bar"
    },
    {
      type: "barometer",
      points: -2,
      expression: "happy",
      message: "Very good, a polite approach is the key to a constructive dialogue."
    },
    {
      type: "reference",
      nextNode: "agent_will_get_back_soon"
    }
  ],

  A_customer_satisfied_02: [
    {
      type: "customer-message",
      messages: ["All right, thank you!"]
    },
    {
      type: "horizontal-bar"
    },
    {
      type: "barometer",
      points: -4,
      expression: "happy",
      message: "Very good, the additional material compensation has contributed to further satisfaction."
    },
    {
      type: "reference",
      nextNode: "agent_will_get_back_soon"
    }
  ],

  agent_will_get_back_soon: [
    {
      type: "system-options",
      options: [
        {
          label: "Then you can continue working on your laptop and I'll call you back as soon as the re-registration has been completed. ok?",
          nextNode: "" //stay empty
        }
      ]
    },
    {
      type: "customer-message",
      messages: ["Yes, that's fine."]
    },
    {
      type: "system-options",
      options: [
        {
          label: "Then have a good day, Mr Romero.",
          nextNode: "Opt_A_end_path_01"
        },
        {
          label: "Do you have any other concerns that I can help you with?",
          nextNode: "Opt_A_end_path_02"
        }
      ]
    }
  ],

  Opt_A_end_path_01: [ 
    {
      type: "horizontal-bar"
    },
    {
      type: "system-note",
      message: "Don't be so quick! Even if you are relieved that the customer is ultimately satisfied, don't forget to use the farewell phase to avoid another call. Ask whether the customer still needs your help."
    },
    {
      type: "system-options",
      options: [
        {
          label: "Do you have any other concerns that I can help with?",
          nextNode: "" //stay empty
        }
      ]
    },
    {
      type: "customer-message",
      messages: ["No, that's all."]
    },
    {
      type: "system-options",
      options: [
        {
          label: "Ok, then you'll hear from me as soon as your internet is working.",
          nextNode: "Path_A_end" //end of A
        }
      ]
    },
  ],

  Opt_A_end_path_02: [
    {
      type: "customer-message",
      messages: ["No, that's all."]
    },
    {
      type: "horizontal-bar"
    },
    {
      type: "system-note",
      message: "Great, you've avoided another potential call by asking. You really think for yourself!"
    },
    {
      type: "system-options",
      options: [
        {
          label: "Have a nice day, Mr Romero, and you'll hear from me again as soon as your internet is working.",
          nextNode: "" //stay empty
        }
      ]
    },
    {
      type: "reference",
      nextNode: "Path_A_end" //end of A 
    }
  ],

  Path_A_end: [
    {
      type: "customer-message",
      messages: ["Great, see you later."]
    }
  ],

  //Slide 17 "B" block starts

  Slide_17_B: [
    {
      type: "system-options",
      options: [
        {
          label: "Thank you for the constructive conversation and your patience!",
          nextNode: "Slide_17_B_opt_01"
        },
        {
          label: "I will give you an additional discount on your next basic fee as compensation for the inconvenience.",
          nextNode: "Slide_17_B_opt_02" //this is used in child function (Slide_17_B_opt_01)
        },
        {
          label: "You're welcome. Then have a nice day, Mr Romero.",
          nextNode: "Slide_17_B_opt_03"
        }
      ]
    }
  ],

  Slide_17_B_opt_01: [
    {
      type: "customer-message",
      messages: ["Yes, this time they really helped me."]
    },
    {
      type: "horizontal-bar"
    },
    {
      type: "barometer",
      points: -2,
      expression: "happy",
      message: "Very good, a polite approach is the key to a constructive dialogue."
    },
    {
      type: "system-options",
      options: [
        {
          label: "Then have a nice day, Mr Romero.",
          nextNode: "Path_B_end_01" //This is lined with function (Slide_17_B_opt_01)
        },
        {
          label: "I will give you an additional discount on your next basic fee as compensation for the inconvenience.",
          nextNode: "Slide_17_B_opt_02" //this is used in main function (Slide_17_B)
        },
      ]
    }
  ],
  
  Path_B_end_01: [
    {
      type: "horizontal-bar"
    },
    {
      type: "system-note",
      message: "Don't be so quick! Always summarise the solution at the end and make sure that the customer agrees with it."
    },
    {
      type: "system-options",
      options: [
        {
          label: "Then you can continue working on your laptop and as soon as the re-registration has been completed, I'll call you back. ok?",
          nextNode: "" //stay empty
        }
      ]
    },
    {
      type: "customer-message",
      messages: ["Yes, that's fine."]
    },
    {
      type: "system-options",
      options: [
        {
          label: "See you later then.",
          nextNode: "" //stay empty
        }
      ]
    },
    {
      type: "customer-message",
      messages: ["See you later."] //end of Path B opt 1
    }
  ],

  Slide_17_B_opt_02: [
    {
      type: "customer-message",
      messages: ["All right, thank you!"]
    },
    {
      type: "horizontal-bar"
    },
    {
      type: "barometer",
      points: -4,
      expression: "happy",
      message: "Top, you have a good hand when it comes to dealing with customers. The additional material compensation has contributed to further satisfaction."
    },
    {
      type: "system-options",
      options: [
        {
          label: "Then you can continue working on your laptop and as soon as the re-registration has been completed, I will call you back. ok?",
          nextNode: "Path_B_end_02" ////this is lined with function (Slide_17_B_opt_02)
        },
        {
          label: "You're welcome. Then have a nice day, Mr Romero.",
          nextNode: "Slide_17_B_opt_03" //this is used in main function (Slide_17_B) //Also this is end 03 (Path_B_end_03)
        },
      ]
    }
  ],

  Path_B_end_02: [
    {
      type: "customer-message",
      messages: ["Yes, that's fine."]
    },
    {
      type: "horizontal-bar"
    },
    {
      type: "system-note",
      message: "By summarising, you make sure that the customer is really satisfied with the solution you have worked out."
    },
    {
      type: "system-options",
      options: [
        {
          label: "See you later then.",
          nextNode: "" //stay empty
        }
      ]
    },
    {
      type: "customer-message",
      messages: ["See you later."] //end of Path B opt 2
    }
  ],

  Slide_17_B_opt_03: [
    {
      type: "horizontal-bar"
    },
    {
      type: "system-note",
      message: "Don't be so quick! Always summarise the solution at the end and make sure that the customer is happy with it."
    },
    {
      type: "system-options",
      options: [
        {
          label: "Then you can continue working on your laptop and as soon as the re-registration has been completed, I'll call you back. ok?",
          nextNode: "" //stay empty
        }
      ]
    },
    {
      type: "customer-message",
      messages: ["Yes, that's fine."]
    },
    {
      type: "system-options",
      options: [
        {
          label: "See you later then.",
          nextNode: "" //stay empty
        }
      ]
    },
    {
      type: "customer-message",
      messages: ["See you later."], //end of Path B opt 3
      last: true
    }
  ]

};



Object.keys(blocksRaw).forEach((key) => {
  blocksRaw[key] = blocksRaw[key].map((block, index) => {
    return {
      ...block,
      id: `${key}-${index}`,
    };
  });
});

export const blocks = blocksRaw;