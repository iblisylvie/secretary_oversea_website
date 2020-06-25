<template>
  <div v-if="issues" class="faqs">
    <Faq>
      <h4>What should I do if binding fails?</h4>
      <p>Verizon</p>
      <p>
        Enable call forwarding for busy, no answer and not reachable situation
      </p>
      <ol>
        <li>
          Enter <strong>*71-938-253-2388</strong> (Don't forget the asterisk)
        </li>
        <li>
          Tap the Call button and wait for confirmation. You should hear a
          confirmation tone or message.
        </li>
        <li>&nbsp;End your call.</li>
      </ol>
      <span
        >Please note that airtime charges may apply to all forwarded calls
        according to your current calling plan from your service provider. If
        you have trouble binding, please go to
        <a href="/support">Support</a> for more information.</span
      >
      <p>AT&T</p>
      <p>You will need to call all of the following numbers to setup.</p>
      <p>Enable call forwarding for busy situations</p>
      <ol>
        <li>
          Enter <strong>*62-938-253-2388</strong> (Don't forget the asterisk)
        </li>
        <li>
          Tap the Call button and wait for confirmation. You should hear a
          confirmation tone or message.
        </li>
      </ol>
      <p>Enable call forwarding for no answer situations</p>
      <ol>
        <li>
          Enter <strong>*92-938-253-2388</strong> (Don't forget the asterisk)
        </li>
        <li>
          Tap the Call button and wait for confirmation. You should hear a
          confirmation tone or message.
        </li>
      </ol>
      <p>Enable call forwarding for non-reachable situations</p>
      <ol>
        <li>
          Enter <strong>*94-938-253-2388</strong> (Don't forget the asterisk)
        </li>
        <li>
          Tap the Call button and wait for confirmation. You should hear a
          confirmation tone or message.
        </li>
      </ol>
      <span
        >Please note that airtime charges may apply to all forwarded calls
        according to your current calling plan from your service provider. If
        you have trouble binding, please go to
        <a href="/support">Support</a> for more information.</span
      >
      <p>Sprint</p>
      <p>Enable call forwarding for busy, no answer situations</p>
      <ol>
        <li>
          Enter <strong>*28-938-253-2388</strong> (Don't forget the asterisk)
        </li>
        <li>
          Tap the Call button and wait for confirmation. You should hear a
          confirmation tone or message.
        </li>
      </ol>
      <span
        >Please note that airtime charges may apply to all forwarded calls
        according to your current calling plan from your service provider. If
        you have trouble binding, please go to
        <a href="/support">Support</a> for more information.</span
      >
      <p>T-Mobile</p>
      <p>You will need to call all of the following numbers to setup.</p>
      <p>Enable call forwarding for busy situations</p>
      <ol>
        <li>
          Enter <strong>**67*1-938-253-2388#</strong> (Don't forget the
          asterisk)
        </li>
        <li>
          Tap the Call button and wait for confirmation. You should hear a
          confirmation tone or message.
        </li>
      </ol>
      <p>Enable call forwarding for non-reachable situations</p>
      <ol>
        <li>
          Enter <strong>**62*1-938-253-2388#</strong> (Don't forget the
          asterisk)
        </li>
        <li>
          Tap the Call button and wait for confirmation. You should hear a
          confirmation tone or message
        </li>
      </ol>
      <p>Enable call forwarding for no answer situations</p>
      <ol>
        <li>
          Enter <strong>**61*1-938-253-2388#</strong> (Don't forget the
          asterisk)
        </li>
        <li>
          Tap the Call button and wait for confirmation. You should hear a
          confirmation tone or message
        </li>
      </ol>
      <span
        >Please note that airtime charges may apply to all forwarded calls
        according to your current calling plan from your service provider. If
        you have trouble binding, please go to
        <a href="/support">Support</a> for more information.</span
      >
      <p>Others</p>
      <p>
        Unfortunately Google Fi is not yet supported. We will work as hard as we
        can to support this carrier.
      </p>
      <p>iOS</p>
      <ol>
        <li>
          Go to Settings ⇒ Phone ⇒ Call Forwarding ⇒ Put in this number:
          <strong>(938) 253-2388</strong> and wait for a while to save.
        </li>
        <li>
          Make sure you choose conditional call forwarding for “busy”,
          “unanswered” and “non-reachable” situations.
        </li>
        <li>
          Call your own phone number to see if call forwarding has succeeded.
        </li>
        <li>
          If this goes to voicemail, you will need to disable it to activate
          HeyTico AI-Assistant.
        </li>
      </ol>
      <p>Android</p>
      <ol>
        <li>
          Got to Phone ⇒ Call Forwarding ⇒ Put in this number:
          <strong>(938) 253-2388</strong> and save changes
        </li>
        <li>
          Make sure you choose conditional call forwarding for “busy”,
          “unanswered” and “non-reachable” situations..
        </li>
        <li>
          Call your own phone number to see if call forwarding has succeeded.
        </li>
        <li>
          If this goes to voicemail, you will need to disable it to activate
          HeyTico AI-Assistant.
        </li>
      </ol>
      <span
        >Please note that airtime charges may apply to all forwarded calls
        according to your current calling plan from your service provider. If
        you have trouble binding, please go to
        <a href="/support">Support</a> for more information.</span
      >
    </Faq>
    <Faq v-for="issue in issues" :key="issue.question" :issue="issue"></Faq>
    <span
      >Still encountering problems? Contact us at
      <a href="mailto:info@mail.heytico.ai">info@mail.heytico.ai</a></span
    >
  </div>
</template>

<script>
import issues from '~/static/specific-faq.json'
import Faq from '~/components/app/Faq.vue'
export default {
  name: 'Support',
  layout: 'dashboard',
  components: { Faq },
  asyncData({ params }) {
    return { issues }
  }
}
</script>

<style lang="scss" scoped>
.faqs {
  padding: 4rem 3rem;
  width: 80%;
  margin: 0 auto;
  max-height: 95vh;
  // overflow: scroll;

  a {
    color: $primary;
  }
}
</style>
