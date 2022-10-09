import React from 'react';
import clsx from 'clsx';
import Layout from '@theme/Layout';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import styles from './index.module.css';
import useBaseUrl from '@docusaurus/useBaseUrl';
import Translate, {translate} from '@docusaurus/Translate';
export default Home;
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container">
        <h1 className="hero__title">{siteConfig.title} <span className="beta-static">Beta</span></h1>
        <p className="hero__subtitle">{siteConfig.tagline}</p>
        <p>We're a developer/practitioner community building reliable and secure modern apps. Contributions welcome!</p>
        <div className={styles.buttons}>
        </div>
      </div>
    </header>
  );
}

function Home() {
  const context = useDocusaurusContext();
  const {siteConfig = {}} = context;
  return (
    <Layout
     title="Home"
     description="Sumo Logic docs - real-time alerting, security, dashboards, and machine-learning-powered analytics for all three types of telemetry — logs, metrics, and traces.">
     <HomepageHeader />
      <main>
      <div className='container-landpage'>
        <div className='column-left'>
          <h1>Get started with Sumo</h1>
          <p>Set up your account and start collecting, importing, and processing your data.</p>
          <div className={styles.buttons}>
          </div>
          <p>
          <button className="getstarted"
              description="Get started">
              <a href="/docs/get-started">Get started →</a>
          </button>
          </p>
        </div>
        <div className='column-right'>
          <img className='landpage-hero' src='img/hero-graphic.png' />
        </div>
      </div>
     <div className="container-landpage">
      <div className="container">
       <h1 align="center">Explore our product guides</h1>
       <p align="center">
       <Tabs>
        <TabItem value="observe" label="Observe" default>
        <p>Ensure application reliability with modern cloud-native monitoring and observability.</p>

        {features1 && features1.length > 0 && (
          <section className="spacer">
            <div className="container">
            <div className="land-flex">
                {features1.map((props, idx) => (
                  <Feature key={idx} {...props} />
                ))}
            </div></div>
          </section>
        )}

        </TabItem>
        <TabItem value="observability" label="Infrastructure Monitoring">
        <p>Ensure application reliability with modern cloud-native monitoring and observability.</p>

        {features3 && features3.length > 0 && (
          <section className="spacer">
            <div className="container">
            <div className="land-flex">
                {features3.map((props, idx) => (
                  <Feature key={idx} {...props} />
                ))}
            </div></div>
          </section>
        )}

        </TabItem>
        <TabItem value="security" label="Security">
        <p>Secure and protect your apps from modern threats.</p>

        {features4 && features4.length > 0 && (
          <section className="spacer">
            <div className="container">
            <div className="land-flex">
                {features4.map((props, idx) => (
                  <Feature key={idx} {...props} />
                ))}
            </div></div>
          </section>
        )}

        </TabItem>
        <TabItem value="other" label="Other Solutions">

        {features2 && features2.length > 0 && (
          <section className="spacer">
            <div className="container">
            <div className="land-flex">
                {features2.map((props, idx) => (
                  <Feature key={idx} {...props} />
                ))}
            </div></div>
          </section>
        )}

         </TabItem>
         </Tabs>
         </p>
         </div>
      </div>
      </main>
    </Layout>
  );
}



const features1 = [
  {
    title: translate({
      id: 'landing.feature.searches-logs.title',
      message: 'Searches and Logs',
      description: 'Title for searches & logs',
    }),
    imageUrl: 'img/icons/search.png',
    description: (<Translate
      id="landing.feature.searches-logs.desc"
      description="Searches and logs description">
        Search, query and analyze your log data sent to Sumo Logic.
      </Translate>),
    link: 'docs/search',
  },
  {
    title: translate({
      id: 'landing.feature.metrics.title',
      message: 'Metrics',
      description: 'Title for metrics',
    }),
    imageUrl: 'img/icons/metrics.png',
    description: (<Translate
      id="landing.feature.metrics.desc"
      description="Metrics description">
        Review performance and activity data collected to monitor and troubleshoot.
      </Translate>),
    link: 'docs/metrics',
  },
  {
    title: translate({
      id: 'landing.feature.apm.title',
      message: 'APM/Traces',
      description: 'Title for APM',
    }),
    imageUrl: 'img/icons/apm.png',
    description: (<Translate
      id="landing.feature.apm.desc"
      description="APM description">
        Monitor and analyze metrics for visibility into infrastructure health and app performance.
      </Translate>),
    link: 'docs/apm',
  },
  {
    title: translate({
      id: 'landing.feature.gi.title',
      message: 'Global Intelligence',
      description: 'Title for Global Intelligence',
    }),
    imageUrl: 'img/icons/cloud/global-intelligence.png',
    description: (<Translate
      id="landing.feature.gi.desc"
      description="Global Intelligence description">
        Install and configure third-party app integrations and services.
      </Translate>),
    link: 'docs/global-intelligence',
  },
];


const features2 = [
  {
    title: translate({
      id: 'landing.feature.integrations.title',
      message: 'Apps and Integrations',
      description: 'Title for Apps',
    }),
    imageUrl: 'img/icons/integrations.png',
    description: (<Translate
      id="landing.feature.integrations.desc"
      description="Apps description">
        Install and configure third-party app integrations and services.
      </Translate>),
    link: 'docs/integrations',
  },

  {
    title: translate({
      id: 'landing.feature.observability.title',
      message: 'Observability',
      description: 'Title for Observability',
    }),
    imageUrl: 'img/icons/observe.png',
    description: (<Translate
      id="landing.feature.observability.desc"
      description="Observability description">
        Deploy and configure solutions to monitor apps and analyze root causes.
      </Translate>),
    link: 'docs/observability',
  },
  {
    title: translate({
      id: 'landing.feature.manage.title',
      message: 'Manage Sumo',
      description: 'Title for manage',
    }),
    imageUrl: 'img/icons/manage.png',
    description: (<Translate
        id="landing.feature.manage.desc"
        description="Manage description">
          Manage advanced and admin features for Sumo Logic.
        </Translate>),
    link: 'docs/manage',
  },
];

const features3 = [
  {
    title: translate({
      id: 'landing.feature.observability.title',
      message: 'Observability',
      description: 'Title for Observability',
    }),
    imageUrl: 'img/icons/observe.png',
    description: (<Translate
      id="landing.feature.observability.desc"
      description="Observability description">
        Deploy and configure solutions to monitor apps and analyze root causes.
      </Translate>),
    link: 'docs/observability',
  },
  {
    title: translate({
      id: 'landing.feature.sdo.title',
      message: 'Software Dev Optimization',
      description: 'Title for SDO',
    }),
    imageUrl: 'img/icons/sdo.png',
    description: (<Translate
      id="landing.feature.sdo.desc"
      description="SDO description">
        Monitor your CI/CD pipelines, accelerate release velocity, and improve reliability.
      </Translate>),
    link: 'docs/sdo',
  },
  {
    title: translate({
      id: 'landing.feature.dashboards.title',
      message: 'Dashboards and Visuals',
      description: 'Title for dashboards',
    }),
    imageUrl: 'img/icons/dashboards.png',
    description: (<Translate
        id="landing.feature.dashboards.desc"
        description="Dashboards description">
          Create visualizations, monitors, and alerts for your apps.
        </Translate>),
    link: 'docs/dashboards-new',
  },
  {
    title: translate({
      id: 'landing.feature.cse.title',
      message: 'Cloud SIEM',
      description: 'Title for CSE',
    }),
    imageUrl: 'img/icons/security/cloud-siem.png',
    description: (<Translate
      id="landing.feature.cse.desc"
      description="CSE description">
        Gain insights and investigate key security issues.
      </Translate>),
    link: 'docs/cse',
  },
];


const features4 = [
  {
    title: translate({
      id: 'landing.feature.cse.title',
      message: 'Cloud SIEM',
      description: 'Title for CSE',
    }),
    imageUrl: 'img/icons/security/cloud-siem.png',
    description: (<Translate
      id="landing.feature.cse.desc"
      description="CSE description">
        Gain insights and investigate key security issues.
      </Translate>),
    link: 'docs/cse',
  },
  {
    title: translate({
      id: 'landing.feature.soar.title',
      message: 'SOAR',
      description: 'Title for SOAR',
    }),
    imageUrl: 'img/icons/security/cloud-siem.png',
    description: (<Translate
      id="landing.feature.soar.desc"
      description="SOAR description">
        Gain insights and investigate key security issues.
      </Translate>),
    link: 'https://www.sumologic.com/solutions/cloud-soar',
  },
];




function Feature({imageUrl, title, description, link}) {
  const imgUrl = useBaseUrl(imageUrl);
  return (
    <div className="land-box">
      {imgUrl && (
        <div className="land-image">
          <img className="featureImage" src={imgUrl} alt={title} />
        </div>
      )}
      <div className="land-body">
      <a href={link} className="land-link"><h3 className="land-title">{title}</h3></a>
      <div className="land-desc"><p>{description}</p></div>
      </div>
    </div>
  );
}
