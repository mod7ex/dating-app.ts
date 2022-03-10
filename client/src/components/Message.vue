<template>
      <div :class="messageClasses">
            <div class="wrapper">
                  <div class="message-content">
                        {{ message }}
                  </div>
                  <span class="message-meta" v-if="!isInfoMessage">
                        <small class="time">{{ time }}</small>
                        <small v-if="who == 'me'" :class="markClasses"></small>
                  </span>
            </div>
      </div>
</template>

<script>
export default {
      name: "Message",

      props: {
            who: {
                  type: String,
                  default: "me",
            },

            message: {
                  type: String,
                  default: "Lorem ipsum dolor sit amet consectetur.",
            },

            time: {
                  type: String,
                  default: "13:05",
            },

            readed: {
                  type: Boolean,
                  default: false,
            },

            isInfoMessage: {
                  type: Boolean,
                  default: false,
            },
      },

      setup(props) {
            let messageClasses = {
                  message: true,
            };

            let markClasses = {
                  mark: true,
                  readed: props.readed,
            };

            if (props.isInfoMessage) messageClasses["info"] = true;
            else messageClasses[props.who] = true;

            return {
                  messageClasses,
                  markClasses,
            };
      },
};
</script>

<style></style>
