#pragma once

template <class T> class Option {
    public:
        static Option None();
        static Option Some(T some);

        T value() { return some_; }
        bool isSome() { return isSome_; }
        bool isNone() { return !isSome_; }

    private:
        Option(); // None ctor
        Option(T some); // Some ctor

        T some_;
        bool isSome_;
};

template <class T>
Option<T>::Option() :
    some_(T()),
    isSome_(false)
{}

template <class T>
Option<T>::Option(T some) :
    some_(some),
    isSome_(true)
{}

template <class T>
Option<T> Option<T>::None() {
    return Option<T>();
}

template <class T>
Option<T> Option<T>::Some(T some) {
    return Option<T>(some);
}