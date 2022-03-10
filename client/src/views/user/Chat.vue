<template>
      <Authenticated>
            <div id="chat">
                  <div class="messages">
                        <Message
                              time="13:05"
                              :isInfoMessage="true"
                              message="today"
                        />

                        <Message time="13:05" />
                        <Message time="13:05" who="him" />
                        <Message time="13:05" who="me" :readed="true" />
                        <Message time="13:05" who="him" />

                        <Message time="13:05" />
                        <Message time="13:05" who="him" />
                        <Message time="13:05" who="me" :readed="true" />
                        <Message time="13:05" who="him" />

                        <Message time="13:05" />
                        <Message time="13:05" who="him" />
                        <Message time="13:05" who="me" :readed="true" />
                        <Message time="13:05" who="him" />

                        <Message time="13:05" />
                        <Message time="13:05" who="him" />
                        <Message time="13:05" who="me" :readed="true" />
                        <Message time="13:05" who="him" />

                        <Message time="13:05" />
                        <Message time="13:05" who="him" />
                        <Message time="13:05" who="me" :readed="true" />
                        <Message time="13:05" who="him" />

                        <Message time="13:05" />
                        <Message time="13:05" who="him" />
                        <Message time="13:05" who="me" :readed="true" />
                        <Message time="13:05" who="him" />
                  </div>

                  <div class="control">
                        <input type="text" placeholder="Message..." />
                        <button>
                              <img src="../../assets/svg/send.svg" />
                        </button>
                  </div>
            </div>
      </Authenticated>
</template>

<script>
import Authenticated from "../../layouts/views/Authenticated.vue";
import Message from "../../components/Message";

export default {
      name: "Chat",
      components: {
            Authenticated,
            Message,
      },
};
</script>

<style lang="scss">
#chat {
      @include center($screen-small * 1.5);
      @include area($py: 1em, $px: 1em, $mt: 0, $mb: 0);

      max-height: 80vh;

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

            .message {
                  margin-bottom: 0.3em;
                  color: white;
                  @include flex($justify: flex-start);

                  .wrapper {
                        max-width: $screen-small * 0.8;
                        padding: 0 0.2em;
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
