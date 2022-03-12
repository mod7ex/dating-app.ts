<template>
      <Authenticated>
            <div id="chat">
                  <div class="messages" ref="messagesArea">
                        <Message
                              v-for="i in msgNum"
                              :key="i"
                              :message="messages[i - 1].message"
                              :time="messages[i - 1].time"
                              :who="messages[i - 1].who"
                              :readed="messages[i - 1].readed"
                              :isInfoMessage="messages[i - 1].isInfoMessage"
                        />
                  </div>

                  <div class="control">
                        <input
                              type="text"
                              placeholder="Message..."
                              v-model.trim="message"
                              ref="messageInput"
                              @keyup.enter="sendMessage"
                        />
                        <button @click="sendMessage">
                              <img src="../../assets/svg/send.svg" />
                        </button>
                  </div>
            </div>
      </Authenticated>
</template>

<script>
import Authenticated from "../../layouts/views/Authenticated.vue";
import Message from "../../components/Message";
import { reactive, ref, computed } from "@vue/reactivity";

export default {
      name: "Chat",
      components: {
            Authenticated,
            Message,
      },

      setup() {
            let messages = reactive([
                  {
                        who: "him",
                        message: "15 july",
                        time: "11:05",
                        readed: false,
                        isInfoMessage: true,
                  },

                  {
                        who: "me",
                        message: "Lorem ipsum dolor sit amet consectetur.",
                        time: "13:05",
                        readed: false,
                        isInfoMessage: false,
                  },

                  {
                        who: "him",
                        message: "ipsum dolor sit amet consectetur. r sit amet consectetur.",
                        time: "11:05",
                        readed: false,
                        isInfoMessage: false,
                  },

                  {
                        who: "me",
                        message: "Lorem ipsum dolor sit amet consectetur.",
                        time: "13:05",
                        readed: false,
                        isInfoMessage: false,
                  },

                  {
                        who: "him",
                        message: "ipsum dolor sit amet consectetur. r sit amet consectetur.",
                        time: "11:05",
                        readed: false,
                        isInfoMessage: false,
                  },

                  {
                        who: "me",
                        message: "ipsum dolo ",
                        time: "11:05",
                        readed: true,
                        isInfoMessage: false,
                  },
            ]);

            let msgNum = computed(() => messages.length);

            let messagesArea = ref(null);
            let messageInput = ref(null);

            let message = ref(null);

            let sendMessage = () => {
                  if (!message.value) return;

                  messages.push({
                        who: "me",
                        message: message.value,
                        time: "11:05",
                        readed: false,
                        isInfoMessage: false,
                  });

                  setTimeout(() => {
                        messagesArea.value.scroll({
                              top: messagesArea.value.scrollHeight,
                              left: 0,
                              behavior: "smooth",
                        });

                        messageInput.value.focus();
                  }, 600);

                  message.value = null;
            };

            return {
                  messages,
                  msgNum,
                  message,
                  sendMessage,
                  messagesArea,
                  messageInput,
            };
      },
};
</script>

<style lang="scss">
#chat {
      @include center($screen-small * 1.5);
      @include area($py: 1em, $px: 1em, $mt: 0, $mb: 0);

      height: 80vh;

      display: grid;
      grid-row-gap: 0.5em;
      grid-template-rows: 1fr auto;

      .messages {
            overflow-y: scroll;

            &::-webkit-scrollbar {
                  display: none;
            }

            border-radius: $border-radius;
            padding-top: 0.3em;
            @include shadow(
                  $x: 0px,
                  $y: 0px,
                  $blure: 7px,
                  $spread: 0px,
                  $c: $black,
                  $inset: true
            );
      }

      .control {
            @include flex($align: stretch);

            input {
                  margin-top: 0 !important;
                  border-top-right-radius: 0;
                  border-bottom-right-radius: 0;
            }

            button {
                  border-top-left-radius: 0;
                  border-bottom-left-radius: 0;
                  background-color: $brand-color;
                  padding: 0 1.5em;
            }
      }
}
</style>
