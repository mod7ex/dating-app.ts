<template>
      <div class="form-field" :class="classObject" :id="id">
            <slot>Form field</slot>
            <small class="error">{{ error }}</small>
      </div>
</template>

<script>
import { computed } from "vue";

export default {
      name: "FormField",

      props: {
            class: String,
            id: String,
            valide: {
                  type: Boolean,
                  default: true,
            },
            error: {
                  type: String,
                  default: " ",
            },
      },

      setup(props) {
            let classObject = computed(() => {
                  let obj = { invalide: !props.valide };
                  obj[props.class] = true;
                  return obj;
            });

            return {
                  classObject,
            };
      },
};
</script>

<style lang="scss">
form {
      .form-field {
            margin-bottom: 1.3em;

            label {
                  @include flex(
                        $justify: flex-start,
                        $align: flex-start,
                        $wrap: wrap
                  );
                  span.mandatory {
                        margin-left: 0.3em;
                        padding: 3px;
                        background-color: red;
                        border-radius: 50%;
                        @include shadow($c: red);
                  }
            }

            &.form-submit {
                  padding-top: 0.7em;
            }

            &.form-checkbox {
                  input {
                        margin-right: 0.5em;
                  }

                  @include flex(
                        $direction: row-reverse,
                        $justify: flex-end,
                        $wrap: wrap
                  );
            }

            &.invalide {
                  input {
                        background-color: rgba(red, 0.1);
                        @include shadow($c: red);

                        &:hover {
                              @include shadow($c: red);
                        }

                        &:focus {
                              @include shadow($c: red);
                              border-color: rgba(red, 0.3);
                        }
                  }
            }

            small {
                  &.error {
                        color: red;
                        font-size: 0.7rem;
                        padding-left: 0.3em;
                        display: block;
                        width: 100%;
                        margin-top: 0.3em;
                  }
            }
      }
}
</style>
