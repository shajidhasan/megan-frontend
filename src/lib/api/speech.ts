import * as sdk from "microsoft-cognitiveservices-speech-sdk"

const speechConfig: sdk.SpeechConfig = sdk.SpeechConfig.fromSubscription("a7f5256297094fd2a4bdc40a1f9bbc59", "southeastasia")
speechConfig.speechRecognitionLanguage = "en-US";
speechConfig.speechSynthesisVoiceName = "en-US-AriaNeural";

const audioConfig: sdk.AudioConfig = sdk.AudioConfig.fromDefaultMicrophoneInput()

export const speechRecognizer = new sdk.SpeechRecognizer(speechConfig, audioConfig)


export const synthesize = async (text: string): Promise<boolean> => {
  const browserSound = new sdk.SpeakerAudioDestination();
  const synAudioConfig = sdk.AudioConfig.fromSpeakerOutput(browserSound);
  const speechSynthesizer = new sdk.SpeechSynthesizer(speechConfig, synAudioConfig)


  return new Promise((resolve, reject) => {
    speechSynthesizer.speakTextAsync(text,
      (_) => {
        speechSynthesizer.close()
      },
      (error) => {
        reject(error)
      }
    )
    browserSound.onAudioEnd = (_) => {
      resolve(true)
    }
  })
}

export const recognize = async (): Promise<string> => {
  return new Promise((resolve, reject) => {
    speechRecognizer.recognizeOnceAsync(
      (result) => {
        resolve(result.text)
      },
      (error) => {
        reject(error)
      }
    )
  });
}

// import { sleep } from "../utilities"
// export const recognize = async (): Promise<string> => {
//   await sleep(2000)
//   return "get me local news"
// }

// export const syntehsize = async (text: string): Promise<boolean> => {
//   await sleep(2000)
//   return true
// }
