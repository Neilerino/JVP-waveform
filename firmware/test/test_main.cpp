#include <Arduino.h>
#include <unity.h>
#include "Util.h"
#include "Messages.h"

void test_ACK() {
    String aS = "R00; 178\r\n";
    AckRequest a = AckRequest();
    bool t1 = aS == a.ToString();
    TEST_ASSERT_TRUE(t1);

    Option<MessageComponents> mcO = MessageComponents::FromString(aS);
    if (mcO.isSome()) {
        Option<AckRequestQuery> aqO = AckRequestQuery::TryCreate(mcO.value());
        TEST_ASSERT_TRUE(aqO.isSome());
    }
}

void test_NACK() {
    String aS = "R01; 179\r\n";
    NackRequest a = NackRequest();
    bool t1 = aS == a.ToString();
    TEST_ASSERT_TRUE(t1);

    Option<MessageComponents> mcO = MessageComponents::FromString(aS);
    if (mcO.isSome()) {
        Option<NackRequestQuery> aqO = NackRequestQuery::TryCreate(mcO.value());
        TEST_ASSERT_TRUE(aqO.isSome());
    }
}

void test_MODE() {
    // TODO: ModeRequest test

    String ms1 = "R02; 180\r\n";
    Option<MessageComponents> mcO1 = MessageComponents::FromString(ms1);

    TEST_ASSERT_TRUE(mcO1.isSome()); // validate message comps
    if (mcO1.isSome()) { 
        Option<ModeRequestQuery> qO = ModeRequestQuery::TryCreate(mcO1.value());

        TEST_ASSERT_TRUE(qO.isSome());  // validate message creation
        if (qO.isSome()) { 
            bool csG = ValidateChecksum(qO.value().Components());
            TEST_ASSERT_TRUE(csG);
        }
    }

    String ms2 = "C02, 0; 213\r\n";
    Option<MessageComponents> mcO2 = MessageComponents::FromString(ms2);

    TEST_ASSERT_TRUE(mcO2.isSome()); // validate message comps
    if (mcO2.isSome()) {
        Option<SetModeCommandQuery> qO = SetModeCommandQuery::TryCreate(mcO2.value());

        TEST_ASSERT_TRUE(qO.isSome()); // validate message creation
        if (qO.isSome()) {
            McuMode::Enum e = McuMode::Enum::Command;
            bool t1 = e == qO.value().mode();
            TEST_ASSERT_TRUE(t1);

            bool csG = ValidateChecksum(qO.value().Components());
            TEST_ASSERT_TRUE(csG);
        }
    }
}

void test_GAIN() {
    // TODO: GainRequest test

    String ms1 = "R03; 181\r\n";
    Option<MessageComponents> mcO1 = MessageComponents::FromString(ms1);

    TEST_ASSERT_TRUE(mcO1.isSome()); // validate message comps
    if (mcO1.isSome()) { 
        Option<GainRequestQuery> qO = GainRequestQuery::TryCreate(mcO1.value());

        TEST_ASSERT_TRUE(qO.isSome()); // validate message creation
        if (qO.isSome()) { 
            bool csG = ValidateChecksum(qO.value().Components());
            TEST_ASSERT_TRUE(csG);
        }
    }

    String ms2 = "C03, 1; 215\r\n";
    Option<MessageComponents> mcO2 = MessageComponents::FromString(ms2);

    TEST_ASSERT_TRUE(mcO2.isSome()); // validate message comps
    if (mcO2.isSome()) {
        Option<SetGainCommandQuery> qO = SetGainCommandQuery::TryCreate(mcO2.value());

        TEST_ASSERT_TRUE(qO.isSome()); // validate message creation
        if (qO.isSome()) {
            bool csG = ValidateChecksum(qO.value().Components());
            TEST_ASSERT_TRUE(csG);
        }
    }
}

void test_FREQ() {
    // TODO: FreqeuncyRequest test

    String ms1 = "R04; 182\r\n";
    Option<MessageComponents> mcO1 = MessageComponents::FromString(ms1);

    TEST_ASSERT_TRUE(mcO1.isSome()); // validate message comps
    if (mcO1.isSome()) { 
        Option<GainRequestQuery> qO = GainRequestQuery::TryCreate(mcO1.value());

        TEST_ASSERT_TRUE(qO.isSome()); // validate message creation
        if (qO.isSome()) { 
            bool csG = ValidateChecksum(qO.value().Components());
            TEST_ASSERT_TRUE(csG);
        }
    }

    String ms2 = "C04, 250; 62\r\n";
    Option<MessageComponents> mcO2 = MessageComponents::FromString(ms2);

    TEST_ASSERT_TRUE(mcO2.isSome()); // validate message comps
    if (mcO2.isSome()) {
        Option<SetGainCommandQuery> qO = SetGainCommandQuery::TryCreate(mcO2.value());

        TEST_ASSERT_TRUE(qO.isSome()); // validate message creation
        if (qO.isSome()) {
            bool csG = ValidateChecksum(qO.value().Components());
            TEST_ASSERT_TRUE(csG);
        }
    }
}

void test_AVG_ACT() {
    // TODO: FreqeuncyRequest test

    String ms1 = "R05; 183\r\n";
    Option<MessageComponents> mcO1 = MessageComponents::FromString(ms1);

    TEST_ASSERT_TRUE(mcO1.isSome()); // validate message comps
    if (mcO1.isSome()) { 
        Option<MovingAverageActiveRequestQuery> qO = MovingAverageActiveRequestQuery::TryCreate(mcO1.value());

        TEST_ASSERT_TRUE(qO.isSome()); // validate message creation
        if (qO.isSome()) { 
            bool csG = ValidateChecksum(qO.value().Components());
            TEST_ASSERT_TRUE(csG);
        }
    }

    String ms2 = "C05, 1; 217\r\n";
    Option<MessageComponents> mcO2 = MessageComponents::FromString(ms2);

    TEST_ASSERT_TRUE(mcO2.isSome()); // validate message comps
    if (mcO2.isSome()) {
        Option<SetMovingAverageActiveCommandQuery> qO = SetMovingAverageActiveCommandQuery::TryCreate(mcO2.value());

        TEST_ASSERT_TRUE(qO.isSome()); // validate message creation
        if (qO.isSome()) {
            TEST_ASSERT_TRUE(qO.value().active())

            bool csG = ValidateChecksum(qO.value().Components());
            TEST_ASSERT_TRUE(csG);
        }
    }
}

void test_AVG_LEN() {
    // TODO: FreqeuncyRequest test

    String ms1 = "R06; 184\r\n";
    Option<MessageComponents> mcO1 = MessageComponents::FromString(ms1);

    TEST_ASSERT_TRUE(mcO1.isSome()); // validate message comps
    if (mcO1.isSome()) { 
        Option<MovingAverageActiveRequestQuery> qO = MovingAverageActiveRequestQuery::TryCreate(mcO1.value());

        TEST_ASSERT_TRUE(qO.isSome()); // validate message creation
        if (qO.isSome()) { 
            bool csG = ValidateChecksum(qO.value().Components());
            TEST_ASSERT_TRUE(csG);
        }
    }

    String ms2 = "C06, 8; 225\r\n";
    Option<MessageComponents> mcO2 = MessageComponents::FromString(ms2);

    TEST_ASSERT_TRUE(mcO2.isSome()); // validate message comps
    if (mcO2.isSome()) {
        Option<SetMovingAverageLengthCommandQuery> qO = SetMovingAverageLengthCommandQuery::TryCreate(mcO2.value());

        TEST_ASSERT_TRUE(qO.isSome()); // validate message creation
        if (qO.isSome()) {
            TEST_ASSERT_EQUAL(8, qO.value().length());

            bool csG = ValidateChecksum(qO.value().Components());
            TEST_ASSERT_TRUE(csG);
        }
    }
}

void setup() {
    delay(2000);
    UNITY_BEGIN(); // testing start

    // Query creation tests
    RUN_TEST(test_ACK);
    RUN_TEST(test_NACK);
    RUN_TEST(test_MODE);
    RUN_TEST(test_GAIN);
    RUN_TEST(test_FREQ);
    RUN_TEST(test_AVG_ACT);
    RUN_TEST(test_AVG_LEN);

    UNITY_END(); // testing end
}

void loop() {

}