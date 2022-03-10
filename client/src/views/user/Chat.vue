<template>
      <Authenticated>
            <div id="chat">
                  <div class="messages">
                        <div class="message">
                              <div class="wrapper info">
                                    <div class="message-content">today</div>
                              </div>
                        </div>

                        <div class="message">
                              <div class="wrapper me">
                                    <div class="message-content">
                                          Lorem ipsum dolor sit amet
                                          consectetur.
                                    </div>
                                    <span class="message-meta">
                                          <small class="time">13:05</small>
                                    </span>
                              </div>
                        </div>
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

export default {
      name: "Chat",
      components: {
            Authenticated,
      },
};
</script>

<style lang="scss">
#chat {
      @include center($screen-small * 1.5);
      @include area($py: 1em, $px: 1em, $mt: 0, $mb: 0);

      min-height: 80vh;

      display: grid;
      grid-row-gap: 0.5em;
      grid-template-rows: 1fr auto;

      .messages {
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
                  padding: 0.1em;
                  @include flex($justify: flex-start);

                  .wrapper {
                        @include flex($justify: flex-start, $align: flex-end);
                        background-color: $brand-color;

                        .message-content {
                              padding: 0.3em;
                        }

                        &.info {
                              justify-content: center;
                              margin: 1em 0;

                              .message-content {
                                    background-color: gray;
                                    border-radius: $border-radius * 2;
                                    color: white;
                              }
                        }

                        &.me {
                              justify-content: flex-end;
                              .message-content {
                                    border-top-left-radius: $border-radius * 2;
                                    border-bottom-left-radius: $border-radius *
                                          2;
                              }

                              .message-meta {
                                    .time {
                                          &::after {
                                                content: "✓";
                                          }
                                    }
                              }
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
