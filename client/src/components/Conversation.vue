<template>
      <div class="msg">
            <router-link :to="{ name: 'Chat' }">
                  <img src="https://placeimg.com/90/90/any" />
            </router-link>

            <div class="msg-data">
                  <router-link :to="{ name: 'Chat' }">
                        <div class="other-part">
                              <h4>
                                    <span
                                          class="status"
                                          :class="userStatusClassObj"
                                    ></span>

                                    <span>{{ name }}</span>
                                    <small>{{ age }}</small>
                              </h4>

                              <span class="time">{{ time }}</span>
                        </div>
                        <div class="data">
                              <small
                                    class="msg-status"
                                    :class="messageStatusClassObj"
                              >
                              </small>

                              <span class="msg-content">{{
                                    cut(content)
                              }}</span>
                        </div>
                  </router-link>
            </div>

            <div class="actions">
                  <a href="#"><img src="../assets/svg/trash.svg" alt="" /></a>
            </div>
      </div>
</template>

<script>
export default {
      name: "Conversation",

      props: {
            name: String,
            age: Number,
            time: String,
            content: String,
            message_status: {
                  type: String,
                  default: "",
            },
            status: {
                  type: String,
                  default: "",
            },
      },

      setup(props) {
            let cut = (str, n = 37) => `${str.substring(0, n)}...`;

            let userStatusClassObj = {};
            let messageStatusClassObj = {};
            userStatusClassObj[props.status] = true;
            messageStatusClassObj[props.message_status] = true;

            return {
                  cut,
                  userStatusClassObj,
                  messageStatusClassObj,
            };
      },
};
</script>

<style lang="scss">
.msg {
      @include shadow($blure: 3px);
      @include flex($justify: flex-start);
      cursor: pointer;
      border-radius: $border-radius;
      margin-bottom: 1.3em;
      // max-width: fit-content;

      a {
            padding: 0 !important;
      }

      & > a img {
            width: 75px;
      }

      &:hover {
            @include shadow($blure: 13px);

            & > a img {
                  @include shadow($blure: 13px);
            }
      }

      & > a img {
            margin-right: 1em;
            @include shadow($blure: 3px);
            border-top-left-radius: $border-radius;
            border-bottom-left-radius: $border-radius;
      }

      .msg-data {
            flex: 1;
            margin: 0.3em;

            a {
                  display: block;
            }

            .data {
                  @include flex($justify: flex-start);
                  // background-color: green;
                  background-color: $white;
                  width: fit-content;
                  padding: 3px 0.3em;
                  border-radius: $border-radius * 2;

                  .msg-status {
                        margin-right: 0.5em;

                        &.arrived {
                              color: white;
                              background-color: $brand-color;
                              border-radius: 50%;
                              padding: 0.5em;
                        }

                        &.unreaded {
                              &::before {
                                    color: $brand-color;
                                    content: "✓";
                                    margin: -3px;
                              }
                        }

                        &.readed {
                              &::before {
                                    color: $brand-color;
                                    content: "✓";
                                    margin: -3px;
                              }
                              &::after {
                                    color: $brand-color;
                                    content: "✓";
                                    margin: -3px;
                              }
                        }
                  }
            }

            .other-part {
                  margin-bottom: 0.5em;
                  @include flex($justify: space-between);

                  h4 {
                        .status {
                              display: inline-block;
                              padding: 0.3em !important;
                              background-color: gray;
                              border-radius: 50%;
                              margin-right: 1em;
                              &.online {
                                    background-color: green;
                              }
                        }
                  }
            }
      }

      .actions {
            margin: 0.3em;
            // background-color: blue;
            text-align: right;
            align-self: end;

            img {
                  width: 17px;
            }
      }
}
</style>
