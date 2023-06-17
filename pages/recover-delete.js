import React, { useContext } from 'react'
import Head from 'next/head'

import Layout from '../components/layout'
import LeftSide from '../components/leftside'
import RightSide from '../components/rightside'
import Form from '../components/recover-delete-step-one'
import BottomBar from '../components/bottombar'

function RecoverDeletePage() {
    return (
        <Layout>
            <Head>
                <title>Passwall Web</title>
            </Head>
            <Layout className="contentBody">
                <LeftSide />
                <RightSide>
                    <div className="container">
                        <Form />
                    </div>
                </RightSide>
            </Layout>
        </Layout>
    )
}

export default RecoverDeletePage
