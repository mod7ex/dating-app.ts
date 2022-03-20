<template>
      <Blank>
            <div class="verify">
                  <h1>Verifying account...</h1>
                  <img src="../../assets/svg/loading.svg" />
            </div>
      </Blank>
</template>

<script>
import Blank from "../../layouts/Blank.vue";

import { useRouter, useRoute } from "vue-router";
import { onMounted } from "vue";
export default {
      name: "Verify",

      components: {
            Blank,
      },

      setup() {
            let router = useRouter();
            let route = useRoute();

            onMounted(() => {
                  let { id, verificationCode } = route.params;

                  console.log(id, verificationCode);

                  if (!id || !verificationCode) return;

                  xhrApi.patch(`/user/verify/${id}/${verificationCode}`)
                        .then((responce) => {
                              console.log(responce.data);
                              setTimeout(async () => {
                                    await router.push({
                                          name: "Login",
                                    });
                              }, 5000);
                        })
                        .catch((error) => {
                              if (error.response) {
                                    console.log(error.response.data);
                              } else if (error.request) {
                                    console.log(error.request);
                              } else {
                                    console.log("Error", error.message);
                              }
                        });
            });
      },
};
</script>

<style lang="scss">
.verify {
      height: 100vh;

      @include flex($direction: column);
}
</style>
