import { watch, ref, reactive } from "vue";
import { debounce } from "../helpers/index";

// this is a setup function

export default function (rules, state) {
      // state is a reactive object x = reactive({...})

      let vHandler = {}; // validation handler

      let isValideForm = ref(true);

      let formTouch = () => {
            isValideForm.value = true;

            for (let f of Object.keys(vHandler)) {
                  vHandler[f].touch();
                  isValideForm.value = isValideForm.value && vHandler[f].valide;
            }
      };

      for (let f of Object.keys(rules)) {
            let obj = reactive({
                  error: " ",
                  valide: true,
                  touch: null,
            });

            obj.touch = function () {
                  obj.error = " ";
                  obj.valide = true;

                  for (let validator of Object.keys(rules[f])) {
                        let result = rules[f][validator](state[f]);
                        if (!result.valide) {
                              obj.error = result.error;
                              obj.valide = false;
                              return;
                        }
                  }
            };

            vHandler[f] = obj;
      }

      for (let field of Object.keys(rules)) {
            watch(
                  () => state[field],
                  debounce((v) => {
                        vHandler[field].touch();
                  }, 1000)
            );
      }

      return {
            vHandler,
            isValideForm,
            formTouch,
      };
}
