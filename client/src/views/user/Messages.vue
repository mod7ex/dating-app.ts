<template>
      <Authenticated>
            <div id="messages">
                  <div class="nav area">
                        <ul>
                              <li>
                                    <button>
                                          <img
                                                src="../../assets/svg/favorite.svg"
                                                alt=""
                                          />
                                          favorits
                                    </button>
                              </li>
                              <li>
                                    <button>
                                          <img
                                                src="../../assets/svg/message.svg"
                                                alt=""
                                          />
                                          unreaded
                                    </button>
                              </li>
                              <li>
                                    <button>
                                          <img
                                                src="../../assets/svg/block.svg"
                                                alt=""
                                          />
                                          blocked
                                    </button>
                              </li>
                        </ul>
                  </div>

                  <div class="msgs area">
                        <Message
                              name="Mourad EL CADI"
                              :age="23"
                              time="18:36"
                              content="Lorem ipsum dolor sit ametconsecte"
                              status="online"
                              message_status="unreaded"
                        />
                        <Message
                              name="Mourad EL CADI"
                              :age="23"
                              time="18:36"
                              content="Lorem ipsum dolor sit ametconsecte"
                              status="online"
                              message_status="readed"
                        />

                        <Message
                              name="Mourad EL CADI"
                              :age="23"
                              time="18:36"
                              content="Lorem ipsum dolor sit ametconsecte"
                              message_status="arrived"
                        />
                  </div>
            </div>
      </Authenticated>
</template>

<script>
import Authenticated from "../../layouts/views/Authenticated.vue";
import Message from "../../components/Message.vue";

export default {
      name: "Messages",
      components: {
            Authenticated,
            Message,
      },

      setup() {
            let cut = (str, n = 37) => `${str.substring(0, n)}...`;

            return {
                  cut,
            };
      },
};
</script>

<style lang="scss">
#messages {
      .area {
            @include area($px: 1em);
      }

      .nav {
            ul {
                  @include flex($wrap: wrap);

                  li {
                        margin: 1em;

                        button {
                              @include flex();
                              @include shadow($blure: 3px);
                              padding: 0.3em;
                              width: 9em;

                              &:hover {
                                    @include shadow($blure: 13px);
                              }

                              img {
                                    width: 17px;
                                    margin-right: 0.3em;
                              }
                        }
                  }
            }
      }
}

@media screen and (min-width: $screen-small) {
      #messages {
            display: grid;
            grid-template-columns: auto 1fr;
            grid-column-gap: 1em;

            .nav {
                  ul {
                        @include flex($direction: column, $align: flex-start);

                        li {
                              margin-bottom: 1em;
                        }
                  }
            }
      }
}
</style>
