import { ref, reactive } from "vue";

export const errors = {
      required: (f) => `field is required`,
      name: (f) => `invalide name`,
      email: (f) => `invalide email`,
      password: (f) => `invalide password`,
      login_field: (f) => `invalide email or username`,
};

export default function (rules, state) {
      // state is a reactive object x = reactive({...})

      let vHandler = {}; // validation handler

      let isValideForm = ref(true);

      let formTouch = () => {
            for (let f of Object.keys(vHandler)) {
                  vHandler[f].touch();
                  isValideForm.value = vHandler[f].valide;
                  if (!isValideForm.value) return;
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
                        if (!rules[f][validator](state[f])) {
                              obj.error = errors[validator](f);
                              obj.valide = false;
                              return;
                        }
                  }
            };

            vHandler[f] = obj;
      }

      return {
            vHandler,
            isValideForm,
            formTouch,
      };
}

/*

{
      field: {
            touch: ()=> {},
            errors: [],
            valide: computed(()=>{}),
      },
      ...,
      touch: () => {}
}

*/
