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

<style lang="scss">
.message {
      animation-name: down_up;
      animation-duration: 500ms;
      animation-timing-function: ease-out;
      animation-iteration-count: 1;

      margin-bottom: 0.3em;
      color: white;
      @include flex($justify: flex-start);

      .wrapper {
            max-width: $screen-small * 0.8;
            padding: 0.2em;
            @include flex($justify: flex-start, $align: flex-end);
            background-color: $brand-color;
      }

      .message-content {
            padding: 0.3em;
      }

      .message-meta {
            @include flex($justify: space-between);
            .time {
                  font-weight: 100;
            }
      }

      &.info {
            justify-content: center;
            margin: 1em 0;

            .wrapper {
                  background-color: gray;
                  border-radius: $border-radius * 3;
            }
      }

      &.me {
            justify-content: flex-end;
            .wrapper {
                  border-top-left-radius: $border-radius * 3;
                  border-bottom-left-radius: $border-radius * 3;
            }

            .message-meta {
                  .mark {
                        margin-left: 0.2em;
                        &::before {
                              content: " ✓";
                        }

                        &.readed {
                              &::after {
                                    margin-left: -6px;
                                    content: "✓";
                              }
                        }
                  }
            }
      }

      &.him {
            .wrapper {
                  flex-direction: row-reverse;
                  border-top-right-radius: $border-radius * 3;
                  border-bottom-right-radius: $border-radius * 3;
            }
      }
}
</style>
