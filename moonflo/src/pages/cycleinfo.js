import React from 'react';
import { useState } from 'react';
import Accordion from '../components/Accordion.js';
import Cycle from '../img/Cycle.jpg';
import Cycle2 from '../img/Cycle2.jpg';
import Accordions from '../components/Accordion.css';
import '../cycleinfo.css';


const accordionData = [
  { 
    title: 'Menstruation', 
    content: (
      <>
        <strong>What's Going On?</strong>
        <p>Aka your period: the days when you’re bleeding that signal the beginning of your cycle. This is when your uterine lining (a mixture of blood and endometrium) sheds through the cervix and vagina. A period of menstrual bleeding can last up to 8 days, but typically might last 4-5 days. A menstrual period can be accompanied by heavy menstrual bleeding while another person's can be light.</p>
        <strong>What You Might Feel And Why</strong>
        <p>Estrogen levels are at their lowest around the first days of your period, so your energy might match that. You’ll have most likely already experienced some of the more classic symptoms of being on your period, including cramps, headaches and bloating.</p>
        <p>If you’re experiencing period pain, like menstrual cramps, it’s because the muscular wall of your uterus is contracting. Receptors in the uterus release prostaglandins as a result, squeezing the blood vessels lining the womb. That cuts off the oxygen supply, triggering and increasing pain.</p>
        <p>Period pain is different for everyone. After years of living in your own body, you’ll know what works best but there’s always warm baths, hot water bottles and gentle movement to help ease the pain. </p>
      </>
    )
  },
  { 
    title: 'Follicular Phase', 
    content: (
      <>
        <strong>What's Going On?</strong>
        <p>The follicular phase encompasses everything that happens before ovulation (and includes your period). During this typically two-week phase of your cycle, your brain communicates with your ovary telling them to prepare an egg that will be released. </p>
        <strong>What You Might Feel And Why</strong>
        <p>Post-period, your estrogen levels begin to rise so you might feel a burst of energy and potentially a mood-boost, too. As the days go on, your estrogen levels will rise, easing any period symptoms and giving you all your pre-ovulatory, high-estrogen feels.</p>
      </>
    )
  },
  { 
    title: 'Ovulation', 
    content: (
      <>
        <strong>What's Going On?</strong>
        <p>You might be wondering, what happens during the ovulation phase? In this menstrual cycle phase, your brain’s told your ovary to prepare an egg. Ovulation is when the egg is released and begins to travel down the fallopian tube. Think of ovulation as the dividing point between your follicular and your luteal phase. </p>
        <strong>What You Might Feel And Why</strong>
        <p>Yes, ovulation discomfort is another Actual Thing, and around 1 in 5 people feel it. If you experience pain around the time of ovulation, it can feel like a dull or sharp cramp on the side where the ovary is releasing the egg. Typically it might last a few hours, but for some it can be felt intermittently for a few days. </p>
        <p>Estrogen peaks about a day before ovulation, so you might experience a quick surge in mood and energy (your hormone levels will drop for a short time after ovulation before they rise again), as well as in your sex drive. You’ll also notice that cervical fluid dries up quickly right after ovulation so you might feel like making the most of an increased sex drive (owing to a gradual rise in estrogen).</p>
      </>
    )
  },
  { 
    title: 'Luteal Phase', 
    content: (
      <>
        <strong>What's Going On?</strong>
        <p>The luteal phase is the next phase (and second part) of your cycle. The luteal phase of the cycle starts just after ovulation (when the ovary releases an egg), and finishes the day before your next period. It typically lasts around two weeks. </p>
        <strong>What You Might Feel And Why</strong>
        <p>Because of the hormonal changes (progesterone peaking, then — just before your period — both progesterone and estrogen hormone levels dropping), this is when you’ll probably experience those ‘classic premenstrual symptoms’ like change of mood, sore or tender breasts, bloating and headaches. A friendly reminder to be gentle with yourself.</p>
      </>
    )
  },
  { 
    title: 'Visualize Your Cycle', 
    content: (
      <>
        <strong>Cycle</strong>
        <p> </p>
        <img src={Cycle} alt="Cycle Phase" style={{ width: '500px', height: 'auto' }}/>
        <p> </p>
        <strong>Anatomy</strong>
        <p> </p>
        <img src={Cycle2} alt="Cycle Phase 2" style={{ width: '500px', height: 'auto' }}/>
      </>
    )
  },

];

const CycleInfo = () => {

  const [openSection, setOpenSection] = useState(null);

  const openAccordion = index => {
    if (openSection === index) {
      setOpenSection(null);
    } else {
      setOpenSection(index);
    }
  };

  return (
<div id='cycleinfo'>

  <h1>Get to know your menstrual cycle!</h1>
  <p>Your menstrual cycle is how your body prepares for a potential pregnancy. It usually lasts around 28 days, but it can range anywhere from 21 to 35 days. During this time, your hormone levels fluctuate, causing various changes throughout the body.</p>
  <p>Many women track their menstrual cycle so that they know when their period is coming. This can help women prepare for their period and avoid the unexpected. While predicting your period is a major benefit to tracking your cycle, there are several other advantages to understanding your menstrual cycle.</p>
  <p>Knowing your menstrual cycle can provide key insights into your overall health and wellbeing. For example:</p>
  <ul>
    <li>It can help you understand your unique patterns</li>
    <li>It can help predict when you will be ovulating</li>
    <li>It can increase your awareness of your overall health and wellness.</li>
    <li>It can tell you a lot about your individual sex drive.</li>
    <li>It can help you understand and manage your mood.</li>
  </ul>
  <p>Your menstrual cycle can say a lot about your health. Understanding your cycle better is key. The menstrual cycle is divided into 4 phases which are menstruation, the follicular phase, ovulation and the luteal phase. Click on each phase below to learn more!</p>
  {accordionData.map((section, index) => (
    <Accordion key={index} title={section.title} content={section.content} isOpen={openSection === index} onClick={() => openAccordion(index)} />
  ))}

 </div>
  );
};

export default CycleInfo;
