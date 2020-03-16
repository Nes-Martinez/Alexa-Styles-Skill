/* eslint-disable  func-names */
/* eslint-disable  no-console */
/* eslint-disable  no-restricted-syntax */

const Alexa = require('ask-sdk-core');

/* INTENT HANDLERS */
const LaunchRequestHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === `LaunchRequest`;
  },
  handle(handlerInput) {
    return handlerInput.responseBuilder
      .speak(welcomeMessage)
      .reprompt(helpMessage)
      .getResponse();
  },
};

const DefinitionHandler = {
  canHandle(handlerInput) {
    const request = handlerInput.requestEnvelope.request;

    return request.type === 'IntentRequest' &&
           request.intent.name === 'AnswerIntent';
  },
  handle(handlerInput) {
    //MATCHING A SLOT VALUE TO AN INPUT.
    const item = getItem(handlerInput.requestEnvelope.request.intent.slots);
    const response = handlerInput.responseBuilder;

    //IF THE DATA WAS FOUND
    if (item && item[Object.getOwnPropertyNames(data[0])[0]] !== undefined) {

      return response.speak(getFullDescription(item))
              .reprompt(repromptSpeech)
              .getResponse();
    }
    //IF THE DATA WAS NOT FOUND
    else
    {
      return response.speak(getBadAnswer(item))
              .reprompt(getBadAnswer(item))
              .getResponse();
    }
  }
};

const StyleHandler = {
  canHandle(handlerInput) {
    const request = handlerInput.requestEnvelope.request;

    return request.type === 'IntentRequest' &&
           request.intent.name === 'StyleIntent';
  },
  handle(handlerInput) {
    //MATCHING A SLOT VALUE TO AN INPUT.
    const item = getItem(handlerInput.requestEnvelope.request.intent.slots);
    const response = handlerInput.responseBuilder;

    //IF THE DATA WAS FOUND
    if (item && item[Object.getOwnPropertyNames(data[0])[0]] !== undefined) {

      return response.speak(getStyleDescription(item))
              .reprompt(repromptSpeech)
              .getResponse();
    }
    //IF THE DATA WAS NOT FOUND
    else
    {
      return response.speak(getBadAnswer(item))
              .reprompt(getBadAnswer(item))
              .getResponse();
    }
  }
};

const LocationHandler = {
  canHandle(handlerInput) {
    const request = handlerInput.requestEnvelope.request;

    return request.type === 'IntentRequest' &&
           request.intent.name === 'LocationIntent';
  },
  handle(handlerInput) {
    //MATCHING A SLOT VALUE TO AN INPUT.
    const item = getItem(handlerInput.requestEnvelope.request.intent.slots);
    const response = handlerInput.responseBuilder;

    //IF THE DATA WAS FOUND
    if (item && item[Object.getOwnPropertyNames(data[0])[0]] !== undefined) {

      return response.speak(getLocationDescription(item))
              .reprompt(repromptSpeech)
              .getResponse();
    }
    //IF THE DATA WAS NOT FOUND
    else
    {
      return response.speak(getBadAnswer(item))
              .reprompt(getBadAnswer(item))
              .getResponse();
    }
  }
};


const HelpHandler = {
  canHandle(handlerInput) {
    const request = handlerInput.requestEnvelope.request;

    return request.type === 'IntentRequest' &&
           request.intent.name === 'AMAZON.HelpHandler';
  },
  handle(handlerInput) {
    return handlerInput.responseBuilder
      .speak(helpMessage)
      .reprompt(helpMessage)
      .getResponse();
  },
};

const ExitHandler = {
  canHandle(handlerInput) {
    const request = handlerInput.requestEnvelope.request;

    return request.type === `IntentRequest` && (
              request.intent.name === 'AMAZON.StopIntent' ||
              request.intent.name === 'AMAZON.PauseIntent' ||
              request.intent.name === 'AMAZON.CancelIntent'
           );
  },
  handle(handlerInput) {
    return handlerInput.responseBuilder
      .speak(exitSkillMessage)
      .getResponse();
  },
};

const SessionEndedRequestHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'SessionEndedRequest';
  },
  handle(handlerInput) {
    return handlerInput.responseBuilder.getResponse();
  },
};

const ErrorHandler = {
  canHandle() {

    return true;
  },
  handle(handlerInput, error) {
    return handlerInput.responseBuilder
      .speak(helpMessage)
      .reprompt(helpMessage)
      .getResponse();
  },
};

/* CONSTANTS */
const skillBuilder = Alexa.SkillBuilders.custom();
const data = [
  {MotifName: 'Sapiarch', MotifStory: 'Summerset expansion', Location: 'doing Alinor daily delve quests', MotifNumber: 24, StyleMaterial: 'Culanda Lacquer'},
  {MotifName: 'Breton', MotifStory: 'Base Game', Location: 'looting desks, dressers, backpacks, trunks, nightstands, wardrobes in all zones', MotifNumber: 5, StyleMaterial: 'Molybdenum'},
  {MotifName: 'Imperial', MotifStory: 'Base Game', Location: 'looting desks, dressers, backpacks, trunks, nightstands, wardrobes in all zones', MotifNumber: 10, StyleMaterial: 'Nickel'},
  {MotifName: 'Coldsnap Goblin', MotifStory: 'Wrathstone dungeon D.L.C.', Location: 'running the Frostvault dungeon', MotifNumber: 71, StyleMaterial: 'goblin cloth scrap'},
  {MotifName: 'Ebony', MotifStory: 'base game', Location: 'purchasing from Rolis Hlaalu, the Mastercraft Mediator, for Master Writ vouchers', MotifNumber: 37, StyleMaterial: 'night pumice'},
  {MotifName: 'Stahlrim Frostcaster', MotifStory: 'base game', Location: 'purchasing in the Crown Store', MotifNumber: 46, StyleMaterial: 'stahlrim shard'},
  {MotifName: 'Ebonshadow', MotifStory: 'Clockwork City D.L.C.', Location: 'doing Clockwork City Daily Quests aiding Blackfeather Court', MotifNumber: 56, StyleMaterial: 'tenebrous cord'}
];

const welcomeMessage = `Welcome to the Elder Scrolls Online Motif encyclopedia!  You can ask me about any of the motifs and styles in the Elder Scrolls Online.  What would you like to do?`;
const exitSkillMessage = `Thanks, come back soon!`;
const repromptSpeech = `Which other motif would you like to know about?`;
const helpMessage = `I know a lot of information about motifs and styles in the Elder Scrolls Online.  You can ask me about a motif, and I'll tell you what I know.  You can ask about style materials, locations, and more.  What would you like to do?`;

/* HELPER FUNCTIONS */

function getBadAnswer(item) {
  return `I'm sorry. That style is not recognized, or is not something I know very much about in this skill. ${helpMessage}`;
}

function getFullDescription(item) {
  return `The ${item.MotifName} motif is number ${item.MotifNumber} on the list, added during the ${item.MotifStory}.  The style material for ${item.MotifName} is ${item.StyleMaterial}. You can find the ${item.MotifName} motif by ${item.Location}.  Which other motif would you like to know about?`;
}

function getStyleDescription(item) {
  return `${item.StyleMaterial} is the style material for the ${item.MotifName} style.`;
}

function getLocationDescription(item) {
  return `You can get the ${item.MotifName} motif by ${item.Location}.`;
}


function getItem(slots) {
  const propertyArray = Object.getOwnPropertyNames(data[0]);
  let slotValue;

  for (const slot in slots) {
    if (Object.prototype.hasOwnProperty.call(slots, slot) && slots[slot].value !== undefined) {
      slotValue = slots[slot].value;
      for (const property in propertyArray) {
        if (Object.prototype.hasOwnProperty.call(propertyArray, property)) {
          const item = data.filter(x => x[propertyArray[property]]
            .toString().toLowerCase() === slots[slot].value.toString().toLowerCase());
          if (item.length > 0) {
            return item[0];
          }
        }
      }
    }
  }
  return slotValue;
}


/* LAMBDA SETUP */
exports.handler = skillBuilder
  .addRequestHandlers(
    LaunchRequestHandler,
    DefinitionHandler,
    StyleHandler,
    LocationHandler,
    HelpHandler,
    ExitHandler,
    SessionEndedRequestHandler
  )
  .addErrorHandlers(ErrorHandler)
  .lambda();
