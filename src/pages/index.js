import React from 'react';
import clsx from 'clsx';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import styles from './index.module.css';
import useBaseUrl from '@docusaurus/useBaseUrl';

const features = [
  {
    title: 'Get Started with Sumo',
    imageUrl: 'img/icons/send-data.png',
    description: (
      <>
        Get and configure a Sumo Logic account, learn the basics, and start collecting data.
      </>
    ),
    link: 'docs/get-started',
  },
  {
    title: 'Dashboards',
    imageUrl: 'img/icons/dashboards.png',
    description: (
      <>
        Create visualizations, notifications, and alerts for your applications.
      </>
    ),
    link: 'docs/get-started',
  },
  {
    title: 'Searches & Logs',
    imageUrl: 'img/icons/logs.png',
    description: (
      <>
        Query and analyze log data sent to Sumo Logic, Search Language, LogReduce, LogExplain, and more. 
      </>
    ),
    link: 'docs/get-started',
  },
  {
    title: 'Metrics',
    imageUrl: 'img/icons/metrics.png',
    description: (
      <>
        Review numeric performance and activity data collected to monitor, troubleshoot, and identify root causes.
      </>
    ),
    link: 'docs/get-started',
  },
  {
    title: 'Application Performance Monitoring',
    imageUrl: 'img/icons/traces.png',
    description: (
      <>
        Monitor user activity, traces data, and service maps to investigate usage and issues.
      </>
    ),
    link: 'docs/get-started',
  },
  {
    title: 'Observability',
    imageUrl: 'img/icons/observe.png',
    description: (
      <>
        Deploy and configure solutions to monitor applications and analyze root causes.
      </>
    ),
    link: 'docs/get-started',
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
        <div className={styles.buttons}>
        </div>
      </div>
    </header>
  );
}

export default function Home() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title={`Hello from ${siteConfig.title}`}
      description="Sumo Logic docs - real-time alerting, dashboards, and machine-learning-powered analytics for all three types of telemetry — logs, metrics, and traces.">
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
