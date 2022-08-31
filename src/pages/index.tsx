import React from 'react';
import clsx from 'clsx';
import Layout from '@theme/Layout';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import styles from './index.module.css';
import useBaseUrl from '@docusaurus/useBaseUrl';
import Translate, {translate} from '@docusaurus/Translate';

const features = [
  {
    title: translate({
      id: 'landing.feature.get-started.title',
      message: 'Get Started with Sumo',
      description: 'Title for get started',
    }),
    imageUrl: 'img/icons/send-data.png',
    description: (<Translate
      id="landing.feature.get-started.desc"
      description="Get started description">
        Get started with your Sumo Logic data analytics journey.
      </Translate>),
    link: 'docs/get-started',
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
        Query and analyze your log data sent to Sumo Logic, Search Language, LogReduce, LogExplain, and more.
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
        Review numeric performance and activity data collected to monitor, troubleshoot, and identify root causes.
      </Translate>),
    link: 'docs/metrics',
  },
  {
    title: translate({
      id: 'landing.feature.apm.title',
      message: 'Application Performance Monitoring',
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
      id: 'landing.feature.observability.title',
      message: 'Observability',
      description: 'Title for Observability',
    }),
    imageUrl: 'img/icons/observe.png',
    description: (<Translate
      id="landing.feature.obserbility.desc"
      description="Observability description">
        Deploy and configure solutions to monitor apps and analyze root causes.
      </Translate>),
    link: 'docs/observability',
  },
  {
    title: translate({
      id: 'landing.feature.integrations.title',
      message: 'Integrations',
      description: 'Title for Integrations',
    }),
    imageUrl: 'img/icons/integrations.png',
    description: (<Translate
      id="landing.feature.integrations.desc"
      description="Integrations description">
        Find, install, and configure integrations with third-party apps and services.
      </Translate>),
    link: 'docs/integrations',
  },
  {
    title: translate({
      id: 'landing.feature.integrations.title',
      message: 'API',
      description: 'Title for API',
    }),
    imageUrl: 'img/icons/cloud/api2.png',
    description: (<Translate
      id="landing.feature.api.desc"
      description="API description">
        Use our APIs to access resources and data programmatically from third-party scripts and apps.
      </Translate>),
    link: 'docs/api',
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

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container">
        <h1 className="hero__title">{siteConfig.title}</h1>
        <p className="hero__subtitle">{siteConfig.tagline}</p>
        <p>We are an open-source community of data analytics users. Contributions are welcome!</p>
        <div className={styles.buttons}>
        </div>
      </div>
    </header>
  );
}

export default function Home(): JSX.Element {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title="Home"
      description="Sumo Logic docs - real-time alerting, security, dashboards, and machine-learning-powered analytics for all three types of telemetry — logs, metrics, and traces.">
      <HomepageHeader />
      <main>
        {features && features.length > 0 && (
          <section className="spacer">
            <div className="container">
            <div className="land-flex">
                {features.map((props, idx) => (
                  <Feature key={idx} {...props} />
                ))}
            </div></div>
          </section>
        )}
      </main>
    </Layout>
  );
}
