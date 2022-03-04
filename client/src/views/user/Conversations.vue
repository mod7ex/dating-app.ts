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
                        <Conversation
                              name="Mourad EL CADI"
                              :age="23"
                              time="18:36"
                              content="Lorem ipsum dolor sit ametconsecte"
                              status="online"
                              message_status="unreaded"
                        />
                        <Conversation
                              name="Mourad EL CADI"
                              :age="23"
                              time="18:36"
                              content="Lorem ipsum dolor sit ametconsecte"
                              status="online"
                              message_status="readed"
                        />

                        <Conversation
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
import Conversation from "../../components/Conversation.vue";

export default {
      name: "Conversations",

      components: {
            Authenticated,
            Conversation,
      },

      setup() {
            let cut = (str, n = 37) => `${str.substring(0, n)}...`;

            return {
                  cut,
            };
      },
};
</script>
