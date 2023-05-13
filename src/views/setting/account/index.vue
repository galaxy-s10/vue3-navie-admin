<template>
  <div class="account-wrap">
    <div class="list">
      <div class="item">
        <div class="label">密码</div>
        <n-button
          text
          type="info"
          @click="resetPwd"
        >
          重置
        </n-button>
      </div>
    </div>

    <component
      :is="currCpt"
      v-if="currCpt !== ''"
      @negative-click="negativeClick"
    ></component>
  </div>
</template>

<script lang="ts">
import { MailOutline } from '@vicons/ionicons5';
import { defineComponent, ref, toRef } from 'vue';

import {
  fetchBindEmail,
  fetchCancelBindEmail,
  fetchCancelSendBindEmailCode,
  fetchSendBindEmailCode,
} from '@/api/emailUser';
import { fetchUserPwd } from '@/api/user';
import { useUserStore } from '@/store/user';

import ResetPwdCpt from './cpt/ResetPwd/index.vue';

export default defineComponent({
  components: { MailOutline, ResetPwdCpt },
  setup() {
    const bindEmailRules = {
      email: { required: true, message: '请输入邮箱', trigger: 'blur' },
      code: { required: true, message: '请输入验证码', trigger: 'blur' },
    };
    const userStore = useUserStore();
    const userInfo: any = toRef(userStore, 'userInfo');
    const password = ref('');
    const currCpt = ref('');
    const loading = ref(false);
    const showModal = ref(false);
    const downCount = ref(0);
    const bindEmailFormRef = ref(null);
    const bindEmailForm = ref({
      email: '',
      code: '',
    });
    /** 发送绑定/取消绑定邮箱验证码 */
    const sendBindEmailCode = async () => {
      if (bindEmailForm.value.email === '')
        return window.$message.warning('请输入邮箱!');
      try {
        loading.value = true;
        let message = '';
        if (userInfo.value.email_users[0]) {
          const res: any = await fetchCancelSendBindEmailCode(
            bindEmailForm.value.email
          );
          message = res.message;
        } else {
          const res: any = await fetchSendBindEmailCode(
            bindEmailForm.value.email
          );
          message = res.message;
        }
        loading.value = false;
        window.$message.success(message);
        downCount.value = 60;
        const timer = setInterval(() => {
          downCount.value -= 1;
          if (downCount.value === 0) {
            clearInterval(timer);
          }
        }, 1000);
      } catch (error: any) {
        loading.value = false;
        window.$message.error(error.message);
      }
    };

    const ajaxBindEmailForm = async () => {
      const res: any = await fetchBindEmail(bindEmailForm.value);
      window.$message.success(res.message);
      bindEmailForm.value = {
        email: '',
        code: '',
      };
    };

    const ajaxCancelBindEmailForm = async () => {
      const res: any = await fetchCancelBindEmail(bindEmailForm.value.code);
      window.$message.success(res.message);
      bindEmailForm.value = {
        email: '',
        code: '',
      };
    };
    const resetPwd = () => {
      currCpt.value = 'ResetPwdCpt';
    };
    const getPwd = async () => {
      const res = await fetchUserPwd();
      password.value = res.data.password;
      window.$message.success('获取密码成功！');
    };

    const submitCallback = () => {
      return new Promise((res, rej) => {
        // @ts-ignore
        bindEmailFormRef.value.validate(async (errors) => {
          if (!errors) {
            try {
              // @ts-ignore
              if (userStore.userInfo.email_users[0]) {
                await ajaxCancelBindEmailForm();
              } else {
                await ajaxBindEmailForm();
              }
              await userStore.getUserInfo();
              res(1);
            } catch (error) {
              console.log(error);
              rej();
            }
          } else {
            rej();
          }
        });
      });
    };

    const handleBindEmail = () => {
      // @ts-ignore
      if (userInfo.value.email_users[0]) {
        // @ts-ignore
        bindEmailForm.value.email = userInfo.value.email_users[0].email;
      }
      showModal.value = true;
    };

    const handlePositiveClick = () => {
      // @ts-ignore
      if (userInfo.value.email_users[0]) {
        // @ts-ignore
        bindEmailForm.value.email = userInfo.value.email_users[0].email;
      }
      showModal.value = true;
    };
    const handleNegativeClick = () => {};
    const negativeClick = () => {
      currCpt.value = '';
    };

    return {
      password,
      currCpt,
      userInfo,
      bindEmailRules,
      bindEmailForm,
      bindEmailFormRef,
      showModal,
      downCount,
      loading,
      sendBindEmailCode,
      submitCallback,
      handleBindEmail,
      handlePositiveClick,
      handleNegativeClick,
      negativeClick,
      resetPwd,
      getPwd,
    };
  },
});
</script>

<style lang="scss" scoped>
.account-wrap {
  .list {
    .item {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 10px 0;
      border-bottom: 1px solid #f1f1f1;
      .label {
        margin: 10px;
        width: 80px;
      }
      .content {
        flex: 1;
      }
    }
  }
}
</style>
