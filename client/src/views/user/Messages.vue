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
                        <div class="msg">
                              <img
                                    src="https://placeimg.com/70/70/any"
                                    alt=""
                              />

                              <div class="msg-data">
                                    <div class="other-part">
                                          <h4>
                                                <span
                                                      class="status online"
                                                ></span>

                                                <span> Sergy Mourad </span>
                                                <small>24</small>
                                          </h4>

                                          <span class="time">18:56</span>
                                    </div>
                                    <div class="data">
                                          <small class="msg-status readed">
                                          </small>

                                          <span class="msg-content">{{
                                                cut(
                                                      "Lorem ipsum dolor sit ametconsecte"
                                                )
                                          }}</span>
                                    </div>
                              </div>

                              <div class="actions">
                                    <a href="#"
                                          ><img
                                                src="../../assets/svg/trash.svg"
                                                alt=""
                                    /></a>
                              </div>
                        </div>

                        <div class="msg">
                              <img
                                    src="https://placeimg.com/70/70/any"
                                    alt=""
                              />

                              <div class="msg-data">
                                    <div class="other-part">
                                          <h4>
                                                <span
                                                      class="status online"
                                                ></span>

                                                <span> Sergy Mourad </span>
                                                <small>24</small>
                                          </h4>

                                          <span class="time">18:56</span>
                                    </div>
                                    <div class="data">
                                          <small class="msg-status unreaded">
                                          </small>
                                          <span class="msg-content">
                                                {{
                                                      cut(
                                                            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam quod officia at ipsa obcaecati ea nemo!"
                                                      )
                                                }}</span
                                          >
                                    </div>
                              </div>

                              <div class="actions">
                                    <a href="#"
                                          ><img
                                                src="../../assets/svg/trash.svg"
                                                alt=""
                                    /></a>
                              </div>
                        </div>

                        <div class="msg">
                              <img
                                    src="https://placeimg.com/70/70/any"
                                    alt=""
                              />

                              <div class="msg-data">
                                    <div class="other-part">
                                          <h4>
                                                <span class="status"></span>

                                                <span> Sergy Mourad </span>
                                                <small>24</small>
                                          </h4>

                                          <span class="time">18:56</span>
                                    </div>
                                    <div class="data">
                                          <small class="msg-status arived">
                                          </small>
                                          <span class="msg-content">
                                                {{
                                                      cut(
                                                            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam quod officia at ipsa obcaecati ea nemo!"
                                                      )
                                                }}</span
                                          >
                                    </div>
                              </div>

                              <div class="actions">
                                    <a href="#"
                                          ><img
                                                src="../../assets/svg/trash.svg"
                                                alt=""
                                    /></a>
                              </div>
                        </div>
                  </div>
            </div>
      </Authenticated>
</template>

<script>
import Authenticated from "../../layouts/views/Authenticated.vue";

export default {
      name: "Messages",
      components: {
            Authenticated,
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

      .msgs {
            .msg {
                  @include shadow($blure: 3px);
                  @include flex($justify: flex-start);
                  cursor: pointer;
                  border-radius: $border-radius;
                  margin-bottom: 1.3em;
                  // max-width: fit-content;

                  &:hover {
                        @include shadow($blure: 13px);

                        & > img {
                              @include shadow($blure: 13px);
                        }
                  }

                  & > img {
                        margin-right: 1em;
                        @include shadow($blure: 3px);
                        border-top-left-radius: $border-radius;
                        border-bottom-left-radius: $border-radius;
                  }

                  .msg-data {
                        flex: 1;
                        margin: 0.3em;

                        .data {
                              @include flex($justify: flex-start);
                              // background-color: green;

                              .msg-status {
                                    margin-right: 0.5em;

                                    &.arived {
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
